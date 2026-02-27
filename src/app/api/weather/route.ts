import { NextRequest, NextResponse } from 'next/server';

type RateLimit = {
  windowStart: number;
  requestCount: number;
};

const KEY = process.env.OPEN_WEATHER_API_KEY;
const URL = process.env.OPEN_WEATHER_API_URL;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const recordOfHitsByIP: Record<string, RateLimit> = {};
let timeOfLastRateLimit = 0;

/*===============================
 * Next.js get client IP from req
 *===============================*/
function getClientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';
}

/*===========================================
 * Check for expired hits from the current IP
 *===========================================*/
function removeExpiredRateLimits(now: number) {
  if (now - timeOfLastRateLimit < RATE_LIMIT_WINDOW_MS) {
    return;
  }

  for (const ip in recordOfHitsByIP) {
    const singleIPLimits = recordOfHitsByIP[ip];

    if (now - singleIPLimits.windowStart >= RATE_LIMIT_WINDOW_MS) {
      delete recordOfHitsByIP[ip];
    }
  }

  timeOfLastRateLimit = now;
}

/*====================
 * Rate limiting by IP
 *====================*/
function incrementRateLimit(ip: string) {
  const now = Date.now();
  removeExpiredRateLimits(now);

  /*================================================================
   * We need to make sure we count the total hits from our user's IP
   *================================================================*/
  const recordOfHitsFromSingleIP = recordOfHitsByIP[ip];

  if (!recordOfHitsFromSingleIP) {
    recordOfHitsByIP[ip] = { windowStart: now, requestCount: 1 };

    return { allowed: true, retryAfterSeconds: 0 };
  }

  /*================================================================
   * Milliseconds elapsed since this IP's current window started.
   *================================================================*/
  const elapsed = now - recordOfHitsFromSingleIP.windowStart;

  if (elapsed >= RATE_LIMIT_WINDOW_MS) {
    recordOfHitsByIP[ip] = { windowStart: now, requestCount: 1 };

    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (recordOfHitsFromSingleIP.requestCount >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000);

    return { allowed: false, retryAfterSeconds };
  }

  recordOfHitsFromSingleIP.requestCount += 1;
  recordOfHitsByIP[ip] = recordOfHitsFromSingleIP;

  return { allowed: true, retryAfterSeconds: 0 };
}

/*===============================================
 * There's an open API to get location, we use it
 *===============================================*/
async function fetchIpGeolocation(clientIP: string) {
  return fetch(`https://ipapi.co/${clientIP}/json/`, { cache: 'no-store' });
}

/*===================================================
 * Use our env keys to get our OpenWeatherMaps result
 *===================================================*/
async function fetchOpenWeather(lat: string | number, lon: string | number) {
  return fetch(`${URL}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${KEY}&units=imperial`, {
    cache: 'no-store',
  });
}

/*==================================
 * Next.js GET for our route.ts file
 *
 *"Oh, hello there. I will stay behind, to gaze at the sun.
 * The sun is a wondrous body. Like a magnificent father!
 * If only I could be so grossly incandescent!"
 *
 * - Solaire of Astora, Dark Souls
 *==================================*/
export async function GET(request: NextRequest) {
  try {
    if (!KEY || !URL) {
      return NextResponse.json({ error: 'No API keys in the ENV. Have you set this up?' }, { status: 500 });
    }

    /*===========
     * Request IP
     *===========*/
    const clientIP = getClientIp(request);

    if (!clientIP) {
      return NextResponse.json({ error: 'Client IP not found' }, { status: 400 });
    }

    const rateLimit = incrementRateLimit(clientIP);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        {
          status: 429,
          headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
        },
      );
    }

    /*=============================================================
     * OpenWeatherMap requires latitude and longitude for their API
     * This is where we get that from the cliet's IP
     *=============================================================*/
    const geoRes = await fetchIpGeolocation(clientIP);

    if (!geoRes.ok) {
      return NextResponse.json({ error: 'IP geolocation failed' }, { status: 502 });
    }

    const { latitude, longitude } = await geoRes.json();

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'No lat/lon for IP' }, { status: 400 });
    }

    /*=========================================================
     * We've made it this far, go ahead and try the weather API
     *=========================================================*/
    const weatherRes = await fetchOpenWeather(latitude, longitude);

    if (!weatherRes.ok) {
      return NextResponse.json({ error: 'OpenWeather request failed' }, { status: 502 });
    }

    const weather = await weatherRes.json();

    /*========================================================
     * We have valid JSON, send it back with our HTTP response
     *========================================================*/
    return NextResponse.json(weather);
  } catch (error) {
    const errorResponse = {
      error: 'Something went wrong',
      /*==================================================
       * If debugging is needed, uncomment the next line
       * and send the error with the response. This should
       * only ever be done while testing locally.
       *==================================================*/
      //debuggingError: error,
    };
    console.error(error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

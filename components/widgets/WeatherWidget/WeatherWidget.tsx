import { useEffect, useState } from 'react';
import Image from 'next/image';
import Thermometer from './Thermometer';
import { Box, List, ListItem, Typography, useTheme } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import type { WeatherData } from './WeatherData';

interface FetchWeatherProps {
  setData: Dispatch<SetStateAction<WeatherData | null>>;
  setError: Dispatch<SetStateAction<string>>;
  signal: AbortSignal;
}

/*===============================================
 * This fetches our weather from our own endpoint
 *===============================================*/
async function fetchWeather({ setData, setError, signal }: FetchWeatherProps) {
  try {
    const res = await fetch('/api/weather', { cache: 'no-store', signal });
    const body = await res.json();

    if (!res.ok) {
      throw new Error(body?.error ?? 'Weather request failed');
    }

    setData(body);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load weather');
  }
}

/*==============================
 * Convert Farenheight to Celcius
 * (32°F − 32) × 5/9 = 0°C
 *===============================*/
export function farenheightToCelcius(temp: number): number {
  return (temp - 32) * (5 / 9);
}

/*==============================
 * "Damn, a storm is coming."
 *
 * - Geralt of Rivia (The Witcher 3)
 *===============================*/
export default function WeatherWidget() {
  const retroTheme = useTheme();
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const weatherAbortController = new AbortController();
    fetchWeather({ setData, setError, signal: weatherAbortController.signal });

    return () => {
      weatherAbortController.abort();
    };
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  if (!data) {
    return <div>Loading weather...</div>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        border: '1px solid #333',
        p: 4,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          alignItems: 'flex-end',
          justifyContent: 'center',
          backgroundImage: `url(/images/weather-widget/birds/${data.weather[0].icon}.webp)`,
          border: `2px solid ${retroTheme.palette.divider}`,
          borderBottom: 'unset',
          borderRadius: '0.75rem',
          borderBottomRightRadius: 'unset',
          borderBottomLeftRadius: 'unset',
          overflow: 'hidden',
          width: '366px',
          height: '240px',

          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))',
          },
        }}
      >
        <Typography
          variant='h3'
          sx={{
            py: 2,
            zIndex: 0,
          }}
        >
          Your Current Weather
        </Typography>
      </Box>
      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          border: `2px solid ${retroTheme.palette.divider}`,
          borderRadius: '1rem',
          borderTopLeftRadius: 'unset',
          borderTopRightRadius: 'unset',
          borderTop: 'unset',
          backgroundColor: '#000',
          m: 0,
          p: 0,

          '& > li:nth-child(odd) .MuiBox-root': {
            textAlign: 'right',
            width: '100%',
          },
        }}
      >
        <ListItem>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Image
              src={`/images/weather-widget/icons/${data.weather[0].icon}.png`}
              alt={`Current conditions are ${data.weather[0].main.toLowerCase()}.`}
              width='100'
              height='100'
            />
            {data.weather[0].main}
          </Box>
        </ListItem>
        <ListItem>
          <Thermometer temperature={data.main.temp} />
        </ListItem>
        <ListItem>
          <Box>Wind Speed: {data.wind.speed}</Box>
        </ListItem>
        <ListItem>
          <Box>Wind Dir(deg): {data.wind.deg}</Box>
        </ListItem>
        <ListItem>
          <Box>Clouds: {data.clouds.all}</Box>
        </ListItem>
      </List>
    </Box>
  );
}

/*
I need this don't judge me
{
  "coord": {
    "lon": -74.006,
    "lat": 40.7128
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 41.94,
    "feels_like": 35.46,
    "temp_min": 38.97,
    "temp_max": 44.55,
    "pressure": 1020,
    "humidity": 60,
    "sea_level": 1020,
    "grnd_level": 1018
  },
  "visibility": 10000,
  "wind": {
    "speed": 11.5,
    "deg": 200
  },
  "clouds": {
    "all": 0
  },
  "dt": 1772221087,
  "sys": {
    "type": 1,
    "id": 4610,
    "country": "US",
    "sunrise": 1772191997,
    "sunset": 1772232273
  },
  "timezone": -18000,
  "id": 5128581,
  "name": "New York",
  "cod": 200
}
*/

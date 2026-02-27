import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
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
 * "Damn, a storm is coming."
 *
 * - Geralt of Rivia (The Witcher 3)
 *===============================*/
export default function WeatherWidget() {
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
        p: 4,
        border: '1px solid #333',
      }}
    >
      {JSON.stringify(data)}
    </Box>
  );
}

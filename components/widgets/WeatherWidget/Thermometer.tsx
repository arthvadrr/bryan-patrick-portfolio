import { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { farenheightToCelcius } from './WeatherWidget';
import { Fire, Snowflake } from '../../SVG';

interface ThermometerProps {
  temperature: number;
}

interface TemperatureGradientProps {
  range: number[];
  fill: string;
  background: string;
}

const TEMPERATURE_GRADIENTS: TemperatureGradientProps[] = [
  { range: [-40, 0], fill: '#2B2D42', background: '#E9ECEF' },
  { range: [1, 32], fill: '#1D4ED8', background: '#E0F2FE' },
  { range: [33, 50], fill: '#0EA5E9', background: '#E0F7FF' },
  { range: [51, 60], fill: '#10B981', background: '#E7FFF4' },
  { range: [61, 72], fill: '#84CC16', background: '#F3FFE0' },
  { range: [73, 85], fill: '#F59E0B', background: '#FFF3D6' },
  { range: [86, 100], fill: '#F97316', background: '#FFE4D5' },
  { range: [101, 120], fill: '#DC2626', background: '#FFE1E1' },
];

function getTemperatureGradient(temperature: number): TemperatureGradientProps | null {
  if (temperature > 120 || temperature < -40) {
    return null;
  }

  for (let i = 0; i < TEMPERATURE_GRADIENTS.length; i++) {
    const [low, high] = TEMPERATURE_GRADIENTS[i].range;

    if (temperature > low && temperature < high) {
      return TEMPERATURE_GRADIENTS[i];
    }
  }

  return null;
}

export default function Thermometer({ temperature }: ThermometerProps) {
  const temperatureGradient = useMemo(() => getTemperatureGradient(temperature), [temperature]);

  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',

        '& meter': {
          background: temperatureGradient?.background,
          borderRadius: '1rem',
          height: '0.75rem',
          width: '100%',
        },

        '& meter::-webkit-meter-bar, & meter::-moz-meter-bar': {
          background: temperatureGradient?.fill,
        },
      }}
    >
      <label htmlFor='temperature'>Temperature</label>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Snowflake
          aria-hidden
          width={25}
          height={25}
          style={{ color: temperatureGradient?.fill }}
        />
        <meter
          id='temperature'
          min='-40'
          max='120'
          low={-60}
          high={140}
          value={temperature}
        />
        <Fire
          aria-hidden
          width={20}
          height={20}
          style={{ color: temperatureGradient?.background }}
        />
      </Box>
      <Box
        aria-hidden='true'
        sx={{ display: 'flex', gap: 1 }}
      >
        <Box>{Math.floor(farenheightToCelcius(temperature))}°C</Box>
        <Divider
          orientation='vertical'
          flexItem
        />
        <Box>{Math.floor(temperature)}°F</Box>
      </Box>
    </Box>
  );
}

import { Box } from '@mui/material';
import WeatherWidget from './widgets/WeatherWidget/WeatherWidget';

export default function Sidebar() {
  return (
    <Box
      component='aside'
      sx={{
        mr: 2,
      }}
    >
      <WeatherWidget />
    </Box>
  );
}

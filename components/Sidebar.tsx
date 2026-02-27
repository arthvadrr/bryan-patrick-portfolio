import { Box } from '@mui/material';
import WeatherWidget from './widgets/WeatherWidget/WeatherWidget';

export default function Sidebar() {
  return (
    <aside>
      <WeatherWidget />
      <Box
        sx={{
          p: 4,
          border: '1px solid #333',
        }}
      >
        This is a widget
      </Box>
      <Box
        sx={{
          p: 4,
          border: '1px solid #333',
        }}
      >
        This is a widget
      </Box>
    </aside>
  );
}

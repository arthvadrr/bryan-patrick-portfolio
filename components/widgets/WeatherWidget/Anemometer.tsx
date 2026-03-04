import { Box, Typography } from '@mui/material';

interface AnemometerProps {
  speed: number;
  direction: string;
}

function convertMPHtoKPH(speed: number) {
  const conversionFactor = 1.60934;

  return speed * conversionFactor;
}

export default function Anemometer({ speed, direction }: AnemometerProps) {
  return (
    <Box>
      <Typography>{speed}</Typography>
      <Typography>{convertMPHtoKPH(speed)}</Typography>
      <Typography>{direction}</Typography>
    </Box>
  );
}

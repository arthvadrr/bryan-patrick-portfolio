import { Box } from '@mui/material';

export default function Portrait({ src }: { src: string }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 0 8px 0 #000',
      }}
    ></Box>
  );
}

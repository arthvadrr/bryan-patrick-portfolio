import WaveDivider from '../WaveDivider/WaveDivider';
import { Box } from '@mui/material';
import type { DividerProps } from '../WaveDivider/WaveDivider';

interface ParralaxSectionProps extends DividerProps {
  background: string;
  color: string;
}

export default function ParallaxSection({
  background,
  color,
  waveHeight,
  height,
  intensity,
  count,
  shape,
  slope,
  randomness,
}: ParralaxSectionProps) {
  return (
    <Box
      component='section'
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height,
        background,
      }}
    >
      <WaveDivider
        color={color}
        waveHeight={waveHeight}
        intensity={intensity}
        count={count}
        shape={shape}
        slope={slope}
        randomness={randomness}
        sx={{
          position: 'absolute',
          bottom: '100%',
        }}
      />
    </Box>
  );
}

import { Box } from '@mui/material';
import type { SVGProps } from 'react';

export type SVGWrapperProps = SVGProps<SVGSVGElement>;

/**
 * TODO
 * NOTE TO SELF.
 * YOU WERE IN THE PROCESS OF PASSING SX DOWN TO THE SVGS
 */

export default function SVGWrapper({
  children,
  viewBox = '0 0 32 32',
  width = '32px',
  height = '32px',
  fill = 'currentColor',
  ...props
}: SVGWrapperProps) {
  return (
    <Box>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox={viewBox}
        width={width}
        height={height}
        fill={fill}
        {...props}
      >
        {children}
      </svg>
    </Box>
  );
}

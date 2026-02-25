'use client';

import { useRef } from 'react';
import { Box, Link, SxProps, useTheme } from '@mui/material';
import { Theme } from '@emotion/react';
import type { ReactNode, PointerEvent } from 'react';

interface GradientLinkProps {
  children: ReactNode;
  gradient?: string;
  href: string;
  underline?: boolean;
  sx?: SxProps<Theme>;
}

/*=====================================================
 * How could a site ever be cool without gradient links?
 *======================================================*/
export default function GradientLink({
  children,
  gradient,
  href,
  sx = {},
}: GradientLinkProps) {
  const retroTheme = useTheme();
  const $Box = useRef<HTMLSpanElement>(null);

  if (!gradient) {
    gradient = retroTheme.gradients.gradientLink;
  }

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    const $BoxWithMouse = $Box.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;

    $BoxWithMouse!.style.setProperty('--mouseX', `${posX}px`);
  }
  return (
    <Box
      component='span'
      ref={$Box}
      onPointerMove={handlePointerMove}
      sx={{
        '--mouseX': '0',
        position: 'relative',
        display: 'inline-block',
        backgroundImage: gradient,
        backgroundRepeat: 'repeat',
        backgroundPositionX: 'var(--mouseX)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: '#fff',
        ...sx,

        '&:focus': {
          backgroundClip: 'unset',
          backgroundImage: 'unset',
        },
      }}
    >
      <Link
        href={href}
        sx={{
          textDecoration: 'none',

          '&:hover *, &:hover': {
            textDecoration: 'underline',
            textDecorationColor: '#fff',
          },
        }}
      >
        {children}
      </Link>
    </Box>
  );
}

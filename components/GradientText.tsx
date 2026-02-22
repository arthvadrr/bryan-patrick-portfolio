'use client';

import { useRef } from "react";
import { Box } from "@mui/material";
import type { ReactNode, PointerEvent } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  makeLettersBiggerOnHover?: boolean
}

/*====================================================
* How could a site ever be cool without gradient text?
*
* We use a css var instead of say, useState.
* 
* This works better than trying to change the property
* with state, so we avoid re-renders. We like to avoid those.
*============================================================*/
export default function GradientText({
  children,
  gradient = "linear-gradient(45deg, #fff8cc, #ffc05c, #ffd8d8, #fff1cc, #c6fff6, #d2ffcc)",
}: GradientTextProps) {
  const $Box = useRef<HTMLSpanElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    const $BoxWithMouse = $Box.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;

    $BoxWithMouse!.style.setProperty("--mouseX", `${posX}px`);
  }

  return (
    <Box
      component="span"
      ref={$Box}
      onPointerMove={handlePointerMove}
      sx={{
        "--mouseX": "0",
        display: "inline-block",
        backgroundImage: gradient,
        backgroundRepeat: 'repeat',
        backgroundPositionX: `var(--mouseX)`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        textShadow: 'none',

        "& > *": {
          display: "contents",
        },
      }}
    >
      {children}
    </Box>
  )
}

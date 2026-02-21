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
* You'll notice on mouseover we do a cool little effect.
* It moves the gradient around. It's meant to be cute.
* 
* We use a css var to do so instead of say, useState.
* 
* This works better than trying to change the property
* with state, so we avoid re-renders. We like to 
* avoid those. Also it performs well and is inexpensive.
*======================================================*/
export default function GradientText({
  children,
  gradient = "linear-gradient(45deg, #fff8cc, #ffc05c, #ffb7d6, #f1ccff, #c6fff6, #fff8cc)",
}: GradientTextProps) {
  const $Box = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const $BoxWithMouse = $Box.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;

    $BoxWithMouse!.style.setProperty("--mouseX", `${posX}px`);
  }

  return (
    <Box
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

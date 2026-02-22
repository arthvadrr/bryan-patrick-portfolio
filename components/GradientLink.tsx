'use client';

import { useRef } from "react";
import { Box, Link } from "@mui/material";
import { useTheme } from "@mui/material";
import type { ReactNode, PointerEvent } from "react";

interface GradientLinkProps {
  children: ReactNode;
  gradient?: string;
  href: string;
}

/*=====================================================
* How could a site ever be cool without gradient links?
*======================================================*/
export default function GradientLink({
  children,
  gradient,
  href
}: GradientLinkProps) {
  const retroTheme = useTheme();

  if (!gradient) {
    gradient = retroTheme.gradients.gradientLink;
  }

  const $Box = useRef<HTMLSpanElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    const $BoxWithMouse = $Box.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left;

    $BoxWithMouse!.style.setProperty("--mouseX", `${posX}px`);
  }

  /*===============================================================
   * If you don't know what display: contents does on line 102,
   * it's simple. Imagine this: 
   * 
   * Grandparent = table
   * Parent = cardboard box
   * Child = cat
   * 
   * <Table>
   *  <CardboardBox>
   *    <Cat>
   *  </CardboardBox>
   * </Table>
   * 
   * The cat is in the cardboard box. He likes the box.
   * 
   *     /\_/\\
   *    ( o.o )
   *     > ^ <
   *   +-------+
   *   |  BOX  |
   *   +-------+
   =================
   *    TABLE
   * 
   * display: contents on the box means:
   * 
   * The box disappears, but the cat stays.
   * Now the cat "acts" like it is directly on the table.
   * The box isn't really gone, just from layout.
   * 
   * The page layout behaves like the box is gone:
   * <Table>
   *   <Cat>
   * </Table>
   * 
   * The cat is slightly annoyed. He knocks your glass off the table
   * 
   *      /\_/\\
   *  /  ( o.o )    |  |
   * |    > ^ <.    |__|
   * |\  |    |===88|__|
   =================
   *    TABLE
   *================================================================*/
  return (
    <Box
      component="span"
      ref={$Box}
      onPointerMove={handlePointerMove}
      sx={{
        "--mouseX": "0",
        position: "relative",
        display: "inline-block",
        backgroundImage: gradient,
        backgroundRepeat: "repeat",
        backgroundPositionX: "var(--mouseX)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
        textShadow: "none",

        "& > *": {
          display: "contents",
        },

        '&:hover': {
          filter: 'drop-shadow(3px 1px 0 #000)'
        }
      }}
    >
      <Link href={href} sx={{
        '&::after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          bottom: '-2px',
          width: '100%',
          height: '2px',
          backgroundPositionX: "var(--mouseX)",
          backgroundRepeat: "repeat",
          backgroundImage: gradient,
          transition: 'height 120ms, bottom 120ms'
        },

        '&:hover::after': {
          height: '4px',
          bottom: '-4px',
          filter: 'drop-shadow(0 0 2px #fff)'
        }
      }}>
        {children}
      </Link>
    </Box>
  )
}

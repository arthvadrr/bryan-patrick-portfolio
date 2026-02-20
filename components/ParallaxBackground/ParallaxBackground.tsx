'use client';

import { Box } from "@mui/material";
import { type SxProps, type Theme } from "@mui/material/styles";

const parentSX: SxProps<Theme> = () => ({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  zIndex: -1,
});

export default function ParallaxBackground() {

  return (
    <Box aria-hidden="true" sx={parentSX}>
      future parallax bg
    </Box>
  );
}

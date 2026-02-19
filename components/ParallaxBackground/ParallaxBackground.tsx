'use client';

import { Box } from "@mui/material";
import { useTheme, type SxProps, type Theme } from "@mui/material/styles";

const parentSX: SxProps<Theme> = (theme) => ({
  position: "absolute",
  height: "100vh",
  width: "100vw",
  top: 0,
  left: 0,
  zIndex: -1,
  backgroundImage: theme.gradients.twilight,
});

export default function ParallaxBackground() {
  const mountainTheme = useTheme();

  return (
    <Box aria-hidden="true" sx={parentSX}>
      future parallax bg
    </Box>
  );
}

import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
}

export default function GradientText({
  children,
  gradient = "linear-gradient(45deg, #fff8cc, #ffc05c, #ffb7d6, #f1ccff, #c6fff6, #fff8cc)",
}: GradientTextProps) {
  return (
    <Box
      sx={{
        display: "inline-block",
        backgroundImage: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",

        "& > *": {
          display: "contents",
        },
      }}
    >
      {children}
    </Box>
  );
}

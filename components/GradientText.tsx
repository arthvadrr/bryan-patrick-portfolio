import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
}

export default function GradientText({
  children,
  gradient = "linear-gradient(90deg, #fff8cc, #ff9d00, #ffc972,  #fff8cc)",
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

import Box, { BoxProps } from "@mui/material/Box";
import { buildDividerPath, DividerShape } from "./SVGS";

/*=================================================
  We want this to act as Box, so we'll use its type
  We have our own color prop though
  =================================================*/
export interface DividerProps extends Omit<BoxProps, "color"> {
  color?: string;
  height?: number;
  intensity?: number;
  count?: number;
  shape?: DividerShape;
}

/*==============================================================
  SVG constants (this is how we make the wave, with constraints)
  ==============================================================*/
const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;
const BASELINE = VIEWBOX_HEIGHT / 2;
const MAX_WAVE = VIEWBOX_HEIGHT / 2 - 2;

/*=====================================================================
  A helper function to make sure our wave never goes above 1 or below 0
  =====================================================================*/
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * =======================================
 * Creates a variable WaveDivider
 * 
 * @returns A divider that extends MUI Box
 * =======================================
 */
export default function WaveDivider({
  color = "currentColor",
  height = 72,
  intensity = 0.5,
  count = 3,
  shape = "smooth",
  sx,
  ...props
}: DividerProps) {
  const waveCount = Math.max(1, Math.round(count));
  const waveHeight = clamp(intensity, 0, 1) * MAX_WAVE;
  const edgePath = buildDividerPath(shape, {
    waveCount,
    waveHeight: waveHeight,
    width: VIEWBOX_WIDTH,
    height: VIEWBOX_HEIGHT,
    baseline: BASELINE,
  });

  /*=================================================
    Turn the thing into an actual polygon...I hope...
    =================================================*/
  const fullPath = `${edgePath} L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z`;

  return (
    <Box
      component="svg"
      role="presentation"
      aria-hidden="true"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      preserveAspectRatio="none"
      sx={{
        display: "block",
        height,
        width: "100%",
        color,
        ...sx,
      }}
      {...props}
    >
      <path d={fullPath} fill="currentColor" />
    </Box>
  );
}

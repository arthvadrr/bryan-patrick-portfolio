import { memo, useMemo } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties } from "react";

/*====================================
 * Types for our options
 *
 * "What is better - To be born good,
 * or to overcome your evil nature
 * through great effort?"
 * 
 * - Paarthurnax, Skyrim 
 *===================================*/
type RetroBorderPosition = "top" | "bottom" | "left" | "right";
type BorderOrientation = "horizontal" | "vertical";
type GlowIntensity = 0 | 1 | 2 | 3 | 4;
type GlowColor = "#ffb742" | "#f2247e" | "#ba34eb" | "#2cdec3";

/*=======================================
 * "We are all born mad. Some remain so." 
 * - Estragon, Waiting for Godot
 *=======================================*/
interface RetroBorderProps {
  position: RetroBorderPosition;
  size?: string | number;
  length?: string | number;
  offset?: string | number;
  glowIntensity?: GlowIntensity;
  showSideBlends?: boolean;
}

/*==============================================================================
 * These are our building blocks to create our border effect and our glow effect 
 *==============================================================================*/
const HORIZONTAL_GRADIENT = "linear-gradient(90deg, #ffb742 0%, #f2247e 33%, #ba34eb 66%, #2cdec3 100%)";
const VERTICAL_GRADIENT = "linear-gradient(180deg, #ffb742 0%, #f2247e 33%, #ba34eb 66%, #2cdec3 100%)";
const GLOW_SPREAD_RADIUS = "10px";
const GLOW_BLUR_RADIUS = "60px";
const MAX_GLOW_OPACITY = 0.5;
const MAX_GLOW_LEVEL = 4;
const SIDE_STOP_PERCENT = 20;

const POSITION_ORIENTATION: Record<RetroBorderPosition, BorderOrientation> = {
  top: "horizontal",
  bottom: "horizontal",
  left: "vertical",
  right: "vertical",
};

const GLOW_COLORS: GlowColor[] = [
  "#ffb742",
  "#f2247e",
  "#ba34eb",
  "#2cdec3",
];

/*===================================================
 * A helper function to make sure we can use css calc 
 *===================================================*/
function toUnit(value: string | number) {
  let result = value;

  if (typeof result === "number") {
    result = `${value}px`;
  }

  return result;
}

/*====================================================
 * Place the glow based on orientation and size/length
 *
 * "Life is so easy for a jellyfish... 
 * just letting the waves carry you onward forever." 
 * 
 * - Penny, Stardew Valley, Jellyfish dance festival
 *====================================================*/
function getGlowSegmentPlacement(
  orientation: BorderOrientation,
  index: number,
  sizeValue: string
): CSSProperties {
  const segmentPercent = 100 / GLOW_COLORS.length;
  const segmentStart = `${index * segmentPercent}%`;
  const segmentSize = `${segmentPercent}%`;

  if (orientation === "vertical") {
    return {
      top: segmentStart,
      left: 0,
      height: segmentSize,
      width: sizeValue,
    };
  }

  return {
    left: segmentStart,
    top: 0,
    width: segmentSize,
    height: sizeValue,
  };
}

function getBorderGradient(
  orientation: BorderOrientation,
  borderColor: string,
  showSideBlends: boolean
): string {
  if (!showSideBlends) {
    if (orientation === "vertical") {
      return VERTICAL_GRADIENT;
    }

    return HORIZONTAL_GRADIENT;
  }

  if (orientation === "vertical") {
    return `linear-gradient(180deg, ${borderColor} 0%, ${GLOW_COLORS[0]} ${SIDE_STOP_PERCENT}%, ${GLOW_COLORS[1]} 40%, ${GLOW_COLORS[2]} 60%, ${GLOW_COLORS[3]} 80%, ${borderColor} 100%)`;
  }

  return `linear-gradient(90deg, ${borderColor} 0%, ${GLOW_COLORS[0]} ${SIDE_STOP_PERCENT}%, ${GLOW_COLORS[1]} 40%, ${GLOW_COLORS[2]} 60%, ${GLOW_COLORS[3]} 80%, ${borderColor} 100%)`;
}

/*=========================================================================
* This is for glueing opacity back to our hex values with intensity changes
*==========================================================================*/
function withOpacity(hex: GlowColor, opacity: number): string {
  const alpha = Math.round(opacity * 255).toString(16).padStart(2, "0");

  return `${hex}${alpha}`;
}

/*==========================
* This creates a box shadow!
*===========================*/
function createGlowShadow(hex: GlowColor, glowOpacity: number): string {
  if (glowOpacity <= 0) {
    return "none";
  }

  return `0 0 ${GLOW_BLUR_RADIUS} ${GLOW_SPREAD_RADIUS} ${withOpacity(hex, glowOpacity)}`;
}

/*=======================================================
 * A Box that acts like a border with some cool effects
 * Memo is used because these really don't need to change
 * on every render.
 *=======================================================*/
export default memo(function RetroBorder({
  position,
  size = '1px',
  length = '80%',
  offset = '20%',
  glowIntensity = 0,
  showSideBlends = false,
}: RetroBorderProps) {
  const theme = useTheme();
  const sizeValue = toUnit(size);
  const lengthValue = toUnit(length);
  const offsetValue = toUnit(offset);
  const calcExpression = `${lengthValue} - ${offsetValue}`;
  const calcLength = `calc(${calcExpression})`;
  const glowOpacity = (glowIntensity / MAX_GLOW_LEVEL) * MAX_GLOW_OPACITY;
  const orientation = POSITION_ORIENTATION[position];
  const borderGradient = useMemo(
    () => getBorderGradient(orientation, theme.palette.divider, showSideBlends),
    [orientation, showSideBlends, theme.palette.divider]);

  const positions: Record<RetroBorderPosition, CSSProperties> = useMemo(() => ({
    top: {
      top: '-1px',
      left: offsetValue,
      width: calcLength,
      height: sizeValue
    },
    bottom: {
      bottom: '-1px',
      left: offsetValue,
      width: calcLength,
      height: sizeValue
    },
    left: {
      left: '-1px',
      top: offsetValue,
      height: calcLength,
      width: sizeValue
    },
    right: {
      right: '-1px',
      top: offsetValue,
      height: calcLength,
      width: sizeValue
    }
  }), [sizeValue, calcLength, offsetValue]);

  return (
    <Box sx={{
      position: 'absolute',
      background: borderGradient,
      ...positions[position]
    }}>
      {GLOW_COLORS.map((hex, index) => (
        <Box
          key={`${position}-${hex}`}
          sx={{
            ...getGlowSegmentPlacement(orientation, index, sizeValue),
            position: "absolute",
            boxShadow: createGlowShadow(hex, glowOpacity),
          }}
        />
      ))}
    </Box>
  )
})
/*============================================================
 * This makes normal "ocean waves" that look even and rounded.
 *
 * We generate SVGs for these.
 *
 * How we make these SVGs:
 * Split the width into equal chunks.
 * For each chunk, draw one rounded hill and one rounded dip.
 * Repeat this to make a smooth wave.
 *
 * L = Line-to (below we use it to make pointy waves).
 * Q = quadratic Bézier curve (for smooth waves. Fancy).
 *
 * Divider Wave Profiles
 *
 * smooth :  _      _      _      _
 *         / \____/ \____/ \____/ \
 *
 * gentle :   _        _        _
 *         _/ \______/ \______/ \_
 *
 * sharp  :   /\  /\  /\  /\  /\  /\
 *         __/  \/  \/  \/  \/  \/  \__
 *============================================================*/


export type DividerShape = "smooth" | "gentle" | "sharp";

interface DividerPathConfig {
  waveCount: number;
  waveHeight: number;
  width: number;
  height: number;
  baseline: number;
}

const pathBuilders: Record<DividerShape, (config: DividerPathConfig) => string> = {
  smooth: buildSmoothPath,
  gentle: buildGentlePath,
  sharp: buildSharpPath,
};

function buildSmoothPath(config: DividerPathConfig): string {
  const { waveCount, waveHeight, width, baseline } = config;
  const segmentWidth = width / waveCount;

  let path = `M 0 ${baseline}`;

  for (let i = 0; i < waveCount; i += 1) {
    const startX = i * segmentWidth;
    const midX = startX + segmentWidth / 2;
    const endX = startX + segmentWidth;
    const crestControlX = startX + segmentWidth / 4;
    const troughControlX = startX + (segmentWidth * 3) / 4;

    path += ` Q ${crestControlX} ${baseline - waveHeight} ${midX} ${baseline}`;
    path += ` Q ${troughControlX} ${baseline + waveHeight} ${endX} ${baseline}`;
  }

  return path;
}

function buildGentlePath(config: DividerPathConfig): string {
  const { waveCount, waveHeight, width, baseline } = config;
  const segmentWidth = width / waveCount;
  let path = `M 0 ${baseline}`;

  for (let i = 0; i < waveCount; i += 1) {
    const startX = i * segmentWidth;
    const midX = startX + segmentWidth / 2;
    const endX = startX + segmentWidth;
    const crestControlX = startX + segmentWidth * 0.2;
    const troughControlX = startX + segmentWidth * 0.8;

    path += ` Q ${crestControlX} ${baseline - waveHeight} ${midX} ${baseline}`;
    path += ` Q ${troughControlX} ${baseline + waveHeight} ${endX} ${baseline}`;
  }

  return path;
}

function buildSharpPath(config: DividerPathConfig): string {
  const { waveCount, waveHeight: waveHeight, width, baseline } = config;
  const segmentWidth = width / waveCount;
  let path = `M 0 ${baseline}`;

  for (let i = 0; i < waveCount; i += 1) {
    const startX = i * segmentWidth;
    const crestX = startX + segmentWidth * 0.25;
    const troughX = startX + segmentWidth * 0.75;
    const endX = startX + segmentWidth;

    path += ` L ${crestX} ${baseline - waveHeight}`;
    path += ` L ${troughX} ${baseline + waveHeight}`;
    path += ` L ${endX} ${baseline}`;
  }

  return path;
}

export function buildDividerPath(shape: DividerShape, config: DividerPathConfig): string {
  return pathBuilders[shape](config);
}
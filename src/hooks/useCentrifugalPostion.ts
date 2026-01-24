import { SimulatorContainer } from "./useSimulator";

export type Orientation = "left" | "right" | "top" | "bottom";

export const ORIENTATION_LOOKUP: Orientation[] = [
  "bottom", // 0
  "left", // 1
  "left", // 2
  "top", // 3
  "top", // 4
  "top", // 5
  "top", // 6
  "right", // 7
  "right", // 8
  "bottom", // 9
  "bottom", // 10
  "bottom", // 11
];

export const SIDE_LABEL_OFFSET_FACTOR = 0.7;

export function getOrientationByPalaceIndex(index: number): Orientation {
  return ORIENTATION_LOOKUP[index] ?? "top";
}

export interface CentrifugalPostionProps {
  palaceIndex: number;
  starIndex: number;
  x: number;
  y: number;
}

type PositionConfig = {
  points: [number, number][];
  text: { x: number; y: number };
};

export function useCentrifugalPostion({
  palaceIndex,
  starIndex,
  x,
  y,
}: CentrifugalPostionProps): PositionConfig {
  const {
    padding: simulatorPadding,
    fontSize,
    selfTransformationFontSize,
    boardStrokeWidth,
    boardPadding,
    palaceSide,
    palacePadding,
    palaceStrokeWidth,
  } = SimulatorContainer.useContainer();

  const orientation = getOrientationByPalaceIndex(palaceIndex);

  /* ---------------- geometry primitives ---------------- */

  const centerX = fontSize / 2;

  const startY = y + fontSize * 2 + palacePadding / 2;
  const arrowY = y + fontSize * (2 + 1.5 + SIDE_LABEL_OFFSET_FACTOR * starIndex);

  const halfTextHeight = (SIDE_LABEL_OFFSET_FACTOR * selfTransformationFontSize) / 2;

  /* ---------------- horizontal exits ---------------- */

  const leftExitX = -x - boardPadding / 2 - boardStrokeWidth / 2;

  const rightExitX = palaceSide - x + boardPadding / 2 + boardStrokeWidth / 2;

  /* ---------------- vertical exits ---------------- */

  const topStartY = y - palacePadding;
  const topExitY = topStartY - simulatorPadding / 2 - boardStrokeWidth / 2;

  const bottomExitY = palaceSide + boardStrokeWidth - palaceStrokeWidth;

  /* ---------------- helpers ---------------- */

  const textLeftX = (x: number) => x - simulatorPadding / 2 - boardStrokeWidth / 2;

  /* ---------------- configs ---------------- */

  const configs: Record<Orientation, PositionConfig> = {
    left: {
      points: [
        [centerX, startY],
        [centerX, arrowY],
        [leftExitX, arrowY],
      ],
      text: {
        x: textLeftX(leftExitX),
        y: arrowY + halfTextHeight,
      },
    },

    right: {
      points: [
        [centerX, startY],
        [centerX, arrowY],
        [rightExitX, arrowY],
      ],
      text: {
        x: rightExitX + simulatorPadding / 2 + boardStrokeWidth / 2,
        y: arrowY + halfTextHeight,
      },
    },

    top: {
      points: [
        [centerX, topStartY],
        [centerX, topExitY],
      ],
      text: {
        x: centerX,
        y: topExitY - boardPadding / 2 - boardStrokeWidth / 2,
      },
    },

    bottom: {
      points: [
        [centerX, startY],
        [centerX, bottomExitY],
      ],
      text: {
        x: centerX,
        y: palaceSide + boardPadding + boardStrokeWidth + selfTransformationFontSize / 2,
      },
    },
  };

  return configs[orientation];
}

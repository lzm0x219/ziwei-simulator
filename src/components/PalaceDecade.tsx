import { Activity } from "react";
import { RenderContainer } from "../hooks/useRender";
import { SimulatorContainer } from "../hooks/useSimulator";

export interface PalaceDecadeProps {
  name?: string;
}

export default function PalaceDecade({ name }: PalaceDecadeProps) {
  const {
    verticalRectWidth,
    verticalRectHeight,
    boardStroke,
    palaceRectStrokeWidth,
    horizontalRectWidth,
    horizontalRectHeight,
    horoscopeRangesFontSize,
    fontLineHeight,
  } = SimulatorContainer.useContainer();

  const render = RenderContainer.useContainer();

  if (!name) {
    return null;
  }

  return (
    <g transform={`translate(${verticalRectWidth}, ${verticalRectHeight * 2.5})`}>
      <rect
        width={horizontalRectWidth}
        height={horizontalRectHeight}
        fill="transparent"
        stroke={boardStroke}
        strokeWidth={render.showPalaceName ? palaceRectStrokeWidth : 0}
      />
      <Activity mode={render.showPalaceName ? "visible" : "hidden"}>
        <text
          x={horizontalRectWidth / 2}
          y={horizontalRectHeight / 2 + fontLineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={horoscopeRangesFontSize}
        >
          {name}
        </text>
      </Activity>
    </g>
  );
}

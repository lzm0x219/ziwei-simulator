import { Activity } from "react";
import { RenderContainer } from "../hooks/useRender";
import { SimulatorContainer } from "../hooks/useSimulator";

export interface PalaceDecadeNameProps {
  name?: string;
}

export default function PalaceDecadeName({ name }: PalaceDecadeNameProps) {
  const {
    verticalRectWidth,
    verticalRectHeight,
    boardStroke,
    palaceRectStrokeWidth,
    horizontalRectWidth,
    horizontalRectHeight,
    fontLineHeight,
    fontSize,
  } = SimulatorContainer.useContainer();

  const render = RenderContainer.useContainer();

  if (!name) {
    return null;
  }

  return (
    <Activity mode={render.showPalaceName ? "visible" : "hidden"}>
      <g transform={`translate(${verticalRectWidth}, ${verticalRectHeight * 2})`}>
        <rect
          width={horizontalRectWidth}
          height={horizontalRectHeight}
          fill="transparent"
          stroke={boardStroke}
          strokeWidth={palaceRectStrokeWidth}
        />

        <text
          x={horizontalRectWidth / 2 - fontSize}
          y={horizontalRectHeight / 2 + fontLineHeight}
          fontSize={fontSize}
          dominantBaseline="middle"
        >
          {name}
        </text>
      </g>
    </Activity>
  );
}

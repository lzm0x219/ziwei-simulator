import { Activity, useMemo } from "react";
import { RenderContainer } from "../hooks/useRender";
import { SimulatorContainer } from "../hooks/useSimulator";

export interface PalaceNameProps {
  name: string;
}

export default function PalaceName({ name }: PalaceNameProps) {
  const { verticalRectWidth, verticalRectHeight, boardStroke, palaceRectStrokeWidth, fontSize } =
    SimulatorContainer.useContainer();

  const render = RenderContainer.useContainer();

  const palaceName = useMemo(() => name?.split("") ?? [], [name]);

  const getStemBranchY = (index: number) => {
    const length = palaceName.filter(Boolean).length;
    if (length === 0) {
      return length;
    }
    if (length > 1 && index === 0) {
      return verticalRectHeight / 2 - palaceRectStrokeWidth;
    }
    if (length === 1 && index === 0) {
      return verticalRectHeight / 2 + fontSize * length;
    }
    return verticalRectHeight / 2 + fontSize * index;
  };

  return (
    <Activity mode={render.showPalaceName ? "visible" : "hidden"}>
      <g transform={`translate(${verticalRectWidth * 5}, ${verticalRectHeight * 2})`}>
        <rect
          width={verticalRectWidth}
          height={verticalRectHeight}
          fill="transparent"
          stroke={boardStroke}
          strokeWidth={palaceName.length > 0 && render.showPalaceName ? palaceRectStrokeWidth : 0}
        />
        <text fontSize={fontSize}>
          {palaceName.map((word, index) => (
            <tspan key={word} x={verticalRectWidth / 2 - fontSize / 2} y={getStemBranchY(index)}>
              {word}
            </tspan>
          ))}
        </text>
      </g>
    </Activity>
  );
}

import type { Stem } from "../typings";
import { Activity } from "react";
import { RenderContainer } from "../hooks/useRender";
import { RuntimeContainer } from "../hooks/useRuntime";
import { SimulatorContainer } from "../hooks/useSimulator";
import { isValidNumber } from "../utils/base";

export interface PalaceStemBranchProps {
  stem?: Stem;
  branch?: string;
}

export default function PalaceStemBranch({ stem, branch }: PalaceStemBranchProps) {
  const { boardStroke, fontSize, verticalRectWidth, verticalRectHeight, palaceRectStrokeWidth } =
    SimulatorContainer.useContainer();

  const render = RenderContainer.useContainer();
  const runtime = RuntimeContainer.useContainer();

  const getStemBranchY = (index: number) => {
    const length = [render.showStem, render.showBranch].filter(Boolean).length;
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

  const getStrokeWidth = () => {
    if (
      stem &&
      branch &&
      render.showBranch &&
      render.showStem &&
      isValidNumber(runtime.main) &&
      render.showPalaceName
    ) {
      return palaceRectStrokeWidth;
    }
    return 0;
  };

  return (
    <g transform={`translate(0, ${verticalRectHeight * 2})`}>
      <rect
        width={verticalRectWidth}
        height={verticalRectHeight}
        fill="transparent"
        stroke={boardStroke}
        strokeWidth={getStrokeWidth()}
      />
      <text fontSize={fontSize} letterSpacing={0} wordSpacing={0}>
        <Activity mode={render.showStem ? "visible" : "hidden"}>
          <tspan x={verticalRectWidth / 2 - fontSize / 2} y={getStemBranchY(0)}>
            {stem}
          </tspan>
        </Activity>
        <Activity mode={render.showBranch ? "visible" : "hidden"}>
          <tspan x={verticalRectWidth / 2 - fontSize / 2} y={getStemBranchY(1)}>
            {branch}
          </tspan>
        </Activity>
      </text>
    </g>
  );
}

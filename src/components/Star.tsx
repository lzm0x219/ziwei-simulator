import type { StarName, Stem } from "../typings";
import { Activity, useMemo } from "react";
import {
  MINOR_STARS,
  POSITION_STARS,
  STEM,
  STEM_TRANSFORMATIONS,
  TRANSFORMATION,
} from "../constants";
import { RenderContainer } from "../hooks/useRender";
import { RuntimeContainer } from "../hooks/useRuntime";
import { SimulatorContainer } from "../hooks/useSimulator";
import { calculateStarTransformation } from "../rules";
import { isValidNumber } from "../utils/base";
import SlefCentrifugal from "./SlefCentrifugal";

export interface StarProps {
  x: number;
  y: number;
  name: StarName;
  stem: Stem;
  starIndex: number;
  palaceIndex: number;
}

export default function Star({ x, y, name, palaceIndex, starIndex, stem: palaceStem }: StarProps) {
  const {
    fontSize,
    ziweiColor,
    minorStarColor,
    fontColor,
    selfTransformationStroke,
    flyingTransformationFill,
    flyingTransformationColor,
    palacePadding,
    positionStarColor,
  } = SimulatorContainer.useContainer();

  const { flyingTransformations, stem } = RuntimeContainer.useContainer();
  const { showTransformation, showSelfTransformation } = RenderContainer.useContainer();

  const flyingIndex = useMemo(() => flyingTransformations.indexOf(name), [flyingTransformations]);

  const hasFlying = useMemo(() => flyingIndex !== -1, [flyingIndex]);

  const transformation = useMemo(() => {
    if (isValidNumber(stem)) {
      const starTransformationIndex = STEM_TRANSFORMATIONS[STEM[stem!]].indexOf(name);

      if (starTransformationIndex === -1) {
        return undefined;
      }
      return TRANSFORMATION[starTransformationIndex];
    }
  }, [stem]);

  const tspans = useMemo(() => name?.split(""), [name]);

  const starColor = useMemo(() => {
    if (hasFlying) {
      return flyingTransformationColor;
    }
    if (name === "紫微") {
      return ziweiColor;
    }
    if ((POSITION_STARS as unknown as string[]).includes(name)) {
      return positionStarColor;
    }
    if ((MINOR_STARS as unknown as string[]).includes(name)) {
      return minorStarColor;
    }
    return fontColor;
  }, [
    name,
    ziweiColor,
    minorStarColor,
    fontColor,
    hasFlying,
    positionStarColor,
    flyingTransformationColor,
  ]);

  const starTransformation = calculateStarTransformation(palaceStem, name);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-(fontSize * 1.2 - fontSize) / 2}
        y={-palacePadding / 2 + fontSize * 0.1}
        width={fontSize * 1.2}
        height={fontSize * 2.2}
        fill={hasFlying ? flyingTransformationFill[flyingIndex] : "transparent"}
        pointerEvents="none"
      />
      <text fontSize={fontSize} fill={starColor} textAnchor="middle">
        {tspans?.map((char, index) => (
          <tspan dominantBaseline="hanging" key={index} x={fontSize / 2} y={fontSize * index}>
            {char}
          </tspan>
        ))}
      </text>
      <Activity
        mode={transformation && showTransformation.includes(transformation) ? "visible" : "hidden"}
      >
        <text
          x={fontSize / 2}
          y={fontSize * 2 + palacePadding / 2}
          fontSize={fontSize}
          fill={selfTransformationStroke}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          {transformation}
        </text>
      </Activity>

      {starTransformation && (
        <Activity mode={showSelfTransformation.includes(starTransformation) ? "visible" : "hidden"}>
          <SlefCentrifugal
            x={x}
            y={y}
            starIndex={starIndex}
            palaceIndex={palaceIndex}
            name={starTransformation}
          />
        </Activity>
      )}
    </g>
  );
}

import { useCentrifugalPostion } from "../hooks/useCentrifugalPostion";
import { SimulatorContainer } from "../hooks/useSimulator";
import ArrowLine from "./ArrowLine";

export interface SlefCentrifugalProps {
  x: number;
  y: number;
  name: string;
  palaceIndex: number;
  starIndex: number;
}

export default function SlefCentrifugal({
  x,
  y,
  palaceIndex,
  starIndex,
  name,
}: SlefCentrifugalProps) {
  const {
    arrowWidth,
    arrowSize,
    selfTransformationStroke,
    selfTransformationFontSize,
    selfTransformationFontWeight,
  } = SimulatorContainer.useContainer();

  const position = useCentrifugalPostion({
    starIndex,
    palaceIndex,
    x,
    y,
  });

  return (
    <g>
      <ArrowLine
        points={position.points}
        arrowSize={arrowSize}
        stroke={selfTransformationStroke}
        strokeWidth={arrowWidth}
      />
      <text
        x={position.text.x}
        y={position.text.y}
        fontSize={selfTransformationFontSize}
        fontWeight={selfTransformationFontWeight}
        textAnchor="middle"
        fill={selfTransformationStroke}
      >
        {name}
      </text>
    </g>
  );
}

import { useCentripetalPostion } from "../hooks/useCentripetalPostion";
import { SimulatorContainer } from "../hooks/useSimulator";
import ArrowLine from "./ArrowLine";

export interface SlefCentripetalProps {
  name: string;
  index: number;
}

export default function SlefCentripetal({ name, index }: SlefCentripetalProps) {
  const {
    arrowSize,
    arrowWidth,
    selfTransformationStroke,
    selfTransformationFontSize,
    selfTransformationFontWeight,
  } = SimulatorContainer.useContainer();
  const position = useCentripetalPostion();
  return (
    <g>
      <ArrowLine
        points={position[index].points}
        arrowSize={arrowSize}
        stroke={selfTransformationStroke}
        strokeWidth={arrowWidth}
      />
      <text
        x={position[index].text.x}
        y={position[index].text.y}
        fontSize={selfTransformationFontSize}
        fontWeight={selfTransformationFontWeight}
        fill={selfTransformationStroke}
        textAnchor="middle"
      >
        {name}
      </text>
    </g>
  );
}

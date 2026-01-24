import { memo, type PropsWithChildren, useRef } from "react";
import { SimulatorContainer } from "../hooks/useSimulator";

export interface PalaceProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

function Palace({
  x,
  y,
  width,
  height,
  fill = "#fff",
  children,
  onClick,
}: PropsWithChildren<PalaceProps>) {
  const { palaceStrokeWidth } = SimulatorContainer.useContainer();
  const ref = useRef(null);

  return (
    <svg x={x} y={y} ref={ref} overflow="visible" onClick={onClick}>
      <rect
        width={width}
        height={height}
        stroke="#000"
        strokeWidth={palaceStrokeWidth}
        fill={fill}
      />
      {children}
    </svg>
  );
}

export default memo(Palace);

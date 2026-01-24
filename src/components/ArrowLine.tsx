import { memo, useId, useMemo } from "react";

// 箭头类型
type ArrowType = "triangle" | "v";

export interface ArrowLineProps {
  /** 折线点坐标数组，格式：[[x1,y1], [x2,y2], ..., [xn,yn]]，至少需要2个点 */
  points: number[][];
  /** 线条颜色 */
  stroke?: string;
  /** 线条宽度 */
  strokeWidth?: number;
  /** 线条末端箭头大小（影响箭头宽度和长度） */
  arrowSize?: number;
  /** 箭头样式（内置或自定义） */
  arrowType?: ArrowType;
  /** 线条是否为虚线，格式：[线段长度, 间隔长度]，如 [5,3] */
  dashArray?: [number, number];
  /** 线条端点样式（round/square/butt） */
  strokeLinecap?: "round" | "square" | "butt";
}

function ArrowLine({
  points,
  stroke = "#333",
  strokeWidth = 2,
  arrowSize = 6,
  arrowType = "v",
  dashArray,
  strokeLinecap = "square",
}: ArrowLineProps) {
  const arrowEndId = useId();

  // 校验路径点数量（至少2个点才能形成线）
  if (points.length < 2) {
    console.warn("折线箭头至少需要2个点坐标");
    return null;
  }

  // 生成折线path的d属性（M:起点，L:后续点）
  const d = () => {
    const [firstX, firstY] = points[0];
    let pathData = `M ${firstX},${firstY}`;
    for (let i = 1; i < points.length; i++) {
      const [x, y] = points[i];
      pathData += ` L ${x},${y}`;
    }
    return pathData;
  };

  // 箭头配置映射表：新增箭头类型时，只需在此添加配置
  const arrowConfigMap = useMemo(() => {
    return {
      // 三角形单向箭头
      triangle: {
        element: (
          <polygon
            points={`0,0 ${arrowSize * 2},${arrowSize} 0,${arrowSize * 2}`}
            fill={stroke}
            stroke={stroke}
            strokeWidth={strokeWidth / 8}
          />
        ),
        markerWidth: arrowSize * 2,
        markerHeight: arrowSize * 2,
        refX: arrowSize,
        refY: arrowSize,
      },
      v: {
        element: (
          <>
            {/* 左边线 */}
            <line
              x1={0}
              y1={0}
              x2={arrowSize * 1.5}
              y2={arrowSize}
              stroke={stroke}
              strokeWidth={strokeWidth / 2}
              strokeLinecap="round"
            />
            {/* 右边线 */}
            <line
              x1={0}
              y1={arrowSize * 2}
              x2={arrowSize * 1.5}
              y2={arrowSize}
              stroke={stroke}
              strokeWidth={strokeWidth / 2}
              strokeLinecap="round"
            />
          </>
        ),
        refX: arrowSize,
        refY: arrowSize,
        markerWidth: arrowSize * 2,
        markerHeight: arrowSize * 2,
      },
    };
  }, [arrowSize, stroke, strokeWidth]);

  // 获取当前类型的箭头配置
  const currentConfig = arrowConfigMap[arrowType];

  return (
    <svg overflow="visible">
      <defs>
        {/* 终点箭头标记（所有类型都需要） */}
        <marker
          id={arrowEndId}
          markerWidth={currentConfig.markerWidth}
          markerHeight={currentConfig.markerHeight}
          refX={currentConfig.refX}
          refY={currentConfig.refY}
          orient="auto"
        >
          {currentConfig.element}
        </marker>
      </defs>
      <path
        d={d()}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeDasharray={dashArray ? `${dashArray[0]},${dashArray[1]}` : undefined}
        fill="none" // 路径不填充
        pointerEvents="none"
        markerEnd={`url(#${arrowEndId})`} // 末端添加箭头
      />
    </svg>
  );
}

export default memo(ArrowLine);

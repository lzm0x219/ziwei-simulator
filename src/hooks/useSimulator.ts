import { useState } from "react";
import { colorPalette } from "../utils/color";
import { createContainer } from "../utils/hooks";

export interface SimulatorProps {
  /** 画布的padding  */
  padding: number;
  /** 命盘的宽高  */
  boardSide: number;
  /** 命盘的padding  */
  boardPadding: number;
  /** 命盘的背景颜色  */
  boardFill: string;
  /** 命盘的边框颜色  */
  boardStroke: string;
  /** 命盘的边框宽度  */
  boardStrokeWidth: number;
  /** 命盘的x坐标  */
  boardX: number;
  /** 命盘的y坐标  */
  boardY: number;
  /** 宫位的宽高  */
  palaceSide: number;
  /** 宫位的padding  */
  palacePadding: number;
  /** 宫位的边框宽度  */
  palaceStrokeWidth: number;
  /** 宫位飞化的背景色  */
  palaceFlyFill: string;
  /** 大命踏入时宫位的背景色 */
  palaceHoroscopeFill: string;
  /** 命盘的字体大小  */
  fontSize: number;
  /** 命盘的字体颜色  */
  fontColor: string;
  /** 命盘的字体（思源宋体）行高比例  */
  fontLineHeight: number;
  /** 宫位矩形的边框宽度  */
  palaceRectStrokeWidth: number;
  /** 横向矩形的宽度  */
  horizontalRectWidth: number;
  /** 横向矩形的高度  */
  horizontalRectHeight: number;
  /** 纵向矩形的宽度  */
  verticalRectWidth: number;
  /** 纵向矩形的高度  */
  verticalRectHeight: number;
  /** 离心自化的 Y 轴起始间距  */
  selfTransformationMarginTop: number;
  /** 自化的字体大小  */
  selfTransformationFontSize: number;
  /** 自化的字體粗度  */
  selfTransformationFontWeight: number;
  /** 自化的颜色  */
  selfTransformationStroke: string;
  /** 大周期范围的字体大小  */
  horoscopeRangesFontSize: number;
  /** 来因宫标识的宽度  */
  laiYinFlagWidth: number;
  /** 来因宫标识的高度  */
  laiYinFlagHeight: number;
  /** 来因宫标识的字体大小  */
  laiYinFlagFontSize: number;
  /** 来因宫标识的字体颜色  */
  laiYinFlagFontColor: string;
  /** 来因宫标识的边框颜色  */
  laiYinFlagStroke: string;
  /** 来因宫标识的边框大小  */
  laiYinFlagStrokeWidth: number;
  /** 来因宫标识的背景颜色 */
  laiYinFlagFill: string;
  /** 来因宫标识的 X 轴坐标系 */
  laiYinFlagX: number;
  /** 来因宫标识的 Y 轴坐标系 */
  laiYinFlagY: number;
  /** 箭头大小 */
  arrowSize: number;
  /** 飞化的背景颜色 */
  flyingTransformationFill: string[];
  /** 飞化的字体颜色 */
  flyingTransformationColor: string;
  /** 紫微星的颜色 */
  ziweiColor: string;
  /** 紫微宫的填充颜色 */
  ziweiPalaceFill: string;
  /** 左右昌曲的颜色 */
  minorStarColor: string;
  /** 流年的字体大小 */
  yearlyFontSize: number;
  /** 箭头的宽度 */
  arrowWidth: number;
  /** 位星的顏色 */
  positionStarColor: string;
}

export const defualtFlyingTransformationFill = [
  colorPalette.y1,
  colorPalette.r1,
  colorPalette.c1,
  colorPalette.b1,
];

export default function useSimulator() {
  const [simulator, setSimulator] = useState<SimulatorProps>(() => {
    const padding = 20;
    const [boardSide, boardPadding, boardStrokeWidth] = [660 - padding * 2, 10, 6];
    const [palaceSide, palacePadding, palaceStrokeWidth] = [
      (boardSide - boardPadding * 2) / 4,
      4,
      2,
    ];
    const [verticalRectWidth, verticalRectHeight] = [palaceSide / 6, palaceSide / 3];

    return {
      padding,
      boardSide,
      boardFill: colorPalette.w1,
      boardStroke: colorPalette.b1,
      boardStrokeWidth,
      boardPadding,
      boardX: padding,
      boardY: padding,
      palaceSide,
      palacePadding,
      palaceStrokeWidth,
      palaceFlyFill: colorPalette.w5,
      palaceHoroscopeFill: colorPalette.w8,
      fontSize: 16,
      fontColor: colorPalette.b1,
      fontLineHeight: 1.1875,
      horizontalRectWidth: palaceSide - verticalRectWidth * 2,
      horizontalRectHeight: verticalRectWidth,
      verticalRectWidth,
      verticalRectHeight,
      horoscopeRangesFontSize: 12,
      selfTransformationFontSize: 14,
      selfTransformationFontWeight: 600,
      selfTransformationStroke: colorPalette.r2,
      selfTransformationMarginTop: 2,
      laiYinFlagWidth: 22,
      laiYinFlagHeight: 38,
      laiYinFlagFontSize: 10,
      laiYinFlagStroke: colorPalette.r2,
      laiYinFlagStrokeWidth: 0,
      laiYinFlagX: 2,
      laiYinFlagY: 2,
      laiYinFlagFill: "transparent",
      laiYinFlagFontColor: colorPalette.r2,
      palaceRectStrokeWidth: 2,
      arrowWidth: 2,
      arrowSize: 3,
      // Star
      ziweiColor: colorPalette.p1,
      ziweiPalaceFill: "transparent",
      minorStarColor: colorPalette.p3,
      positionStarColor: colorPalette.g4,
      flyingTransformationFill: defualtFlyingTransformationFill,
      flyingTransformationColor: colorPalette.w1,
      yearlyFontSize: 10,
    };
  });

  return {
    ...simulator,
    setSimulator,
  };
}

export const SimulatorContainer = createContainer(useSimulator);

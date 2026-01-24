import { useMemo } from "react";
import { SimulatorContainer } from "./useSimulator";

export function usePalaceCoordinates() {
  const { boardX, boardY, palaceSide, boardPadding } = SimulatorContainer.useContainer();
  // 宫位左上角坐标，依赖布局配置，memo 化避免重复创建
  const coordinates = useMemo(
    () => [
      {
        x: boardX + boardPadding,
        y: boardY + boardPadding + palaceSide * 3,
      },
      {
        x: boardX + boardPadding,
        y: boardY + boardPadding + palaceSide * 2,
      },
      {
        x: boardX + boardPadding,
        y: boardY + boardPadding + palaceSide * 1,
      },
      {
        x: boardX + boardPadding,
        y: boardY + boardPadding,
      },
      {
        x: boardX + boardPadding + palaceSide * 1,
        y: boardY + boardPadding,
      },
      {
        x: boardX + boardPadding + palaceSide * 2,
        y: boardY + boardPadding,
      },
      {
        x: boardX + boardPadding + palaceSide * 3,
        y: boardY + boardPadding,
      },
      {
        x: boardX + boardPadding + palaceSide * 3,
        y: boardY + boardPadding + palaceSide * 1,
      },
      {
        x: boardX + boardPadding + palaceSide * 3,
        y: boardY + boardPadding + palaceSide * 2,
      },
      {
        x: boardX + boardPadding + palaceSide * 3,
        y: boardY + boardPadding + palaceSide * 3,
      },
      {
        x: boardX + boardPadding + palaceSide * 2,
        y: boardY + boardPadding + palaceSide * 3,
      },
      {
        x: boardX + boardPadding + palaceSide * 1,
        y: boardY + boardPadding + palaceSide * 3,
      },
    ],
    [boardX, boardY, boardPadding, palaceSide],
  );

  return coordinates;
}

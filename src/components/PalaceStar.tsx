import type { StarName, Stem } from "../typings";
import { useMemo } from "react";
import { SimulatorContainer } from "../hooks/useSimulator";
import { calculateStarTransformation } from "../rules";
import Star from "./Star";

export interface PalaceStarProps {
  stem: Stem;
  stars: StarName[];
  index: number;
}

export default function PalaceStar({ index, stars, stem }: PalaceStarProps) {
  const { fontSize, fontLineHeight, palaceSide, palacePadding } = SimulatorContainer.useContainer();

  const x = palaceSide - palacePadding - fontSize * fontLineHeight;

  const y = palacePadding;

  const onlyCfIndex = useMemo(() => {
    const map = new Map<StarName, number>();
    let idx = 0;
    for (const starName of stars) {
      if (calculateStarTransformation(stem, starName)) {
        map.set(starName, idx);
        idx += 1;
      }
    }
    return map;
  }, [JSON.stringify(stars)]);

  return (
    <g>
      {stars.map((star, i) => (
        <Star
          key={star}
          x={x - fontLineHeight * fontSize * i}
          y={y}
          name={star}
          stem={stem}
          starIndex={onlyCfIndex.get(star) ?? 0}
          palaceIndex={index}
        />
      ))}
    </g>
  );
}

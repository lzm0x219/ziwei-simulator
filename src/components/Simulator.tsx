import type { Transformation } from "../typings";
import { createStyles } from "antd-style";
import { Activity, useEffect, useMemo } from "react";
import { PLACE_BRANCH, STEM, STEM_TRANSFORMATIONS } from "../constants";
import { usePalaceCoordinates } from "../hooks/usePalaceCoordinates";
import { RenderContainer } from "../hooks/useRender";
import { RuntimeContainer } from "../hooks/useRuntime";
import { SimulatorContainer } from "../hooks/useSimulator";
import {
  calculateDecadePalaces,
  calculateDecadeRanges,
  calculateFiveElementNum,
  calculatePalaces,
  calculateStars,
  calculateStems,
  getDecadeDirection,
  isLaiYin,
  calculateYearlys,
  calculateYearlyPalaces,
  calculateStarTransformation,
} from "../rules";
import { oppositeIndex, wrapIndex } from "../utils/array";
import { isValidNumber } from "../utils/base";
import LaiYin from "./LaiYin";
import Palace from "./Palace";
import PalaceDecade from "./PalaceDecade";
import PalaceDecadeName from "./PalaceDecadeName";
import PalaceName from "./PalaceName";
import PalaceStar from "./PalaceStar";
import PalaceStemBranch from "./PalaceStemBranch";
import SlefCentripetal from "./SlefCentripetal";

export interface SimulatorProsp {
  side?: number;
}

const useStyles = createStyles(({ token, css }) => ({
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${token.paddingLG}px;
    width: 55%;
    height: 100dvh;
    background-color: ${token.colorBgLayout};
  `,
}));

export default function SimulatorView({ side = 660 }: SimulatorProsp) {
  const { styles } = useStyles();
  const {
    boardSide,
    boardX,
    boardY,
    boardFill,
    boardStroke,
    boardStrokeWidth,
    palaceSide,
    laiYinFlagX,
    laiYinFlagY,
    palaceFlyFill,
    palaceHoroscopeFill,
    ziweiPalaceFill,
    verticalRectHeight,
    yearlyFontSize,
  } = SimulatorContainer.useContainer();

  const palaceCoordinates = usePalaceCoordinates();

  const runtime = RuntimeContainer.useContainer();
  const render = RenderContainer.useContainer();

  const stems = useMemo(() => calculateStems(runtime.stem), [runtime.stem]);
  const stars = useMemo(
    () => calculateStars(runtime.ziwei, runtime.month, runtime.hour, render.showLocationStar),
    [runtime.ziwei, runtime.month, runtime.hour, render.showLocationStar],
  );

  const mainIndex = useMemo(() => {
    if (isValidNumber(runtime.main)) {
      return wrapIndex(runtime.main - 2);
    }
    if (isValidNumber(runtime.month) && isValidNumber(runtime.hour)) {
      return wrapIndex(runtime.month - runtime.hour);
    }
    return undefined;
  }, [runtime.month, runtime.hour, runtime.main]);

  const palaces = useMemo(() => calculatePalaces(mainIndex), [mainIndex]);

  const decadePalaces = useMemo(() => {
    if (isValidNumber(runtime.decade)) {
      return calculateDecadePalaces(wrapIndex(runtime.decade - 2));
    }
    return [];
  }, [runtime.decade]);

  const yearlyPalaces = useMemo(() => {
    if (isValidNumber(runtime.yearly)) {
      return calculateYearlyPalaces(wrapIndex(runtime.yearly - 2));
    }
    return [];
  }, [runtime.yearly]);

  const fiveElement = useMemo(() => {
    if (isValidNumber(runtime.stem) && isValidNumber(mainIndex)) {
      const { fiveElementNum, fiveElementName } = calculateFiveElementNum(runtime.stem, mainIndex);
      return { fiveElementNum, fiveElementName };
    }
  }, [runtime.stem, mainIndex]);

  useEffect(() => {
    if (fiveElement) {
      runtime.setFiveElementNum(fiveElement.fiveElementNum);
      runtime.setFiveElementName(fiveElement.fiveElementName);
    } else {
      runtime.setFiveElementNum(undefined);
      runtime.setFiveElementName(undefined);
    }
  }, [fiveElement]);

  useEffect(() => {
    if (isValidNumber(mainIndex)) {
      runtime.setDecade(wrapIndex(mainIndex + 2));
    } else {
      runtime.setDecade(Infinity);
    }
  }, [mainIndex]);

  const decadeRanges = useMemo(() => {
    if (
      isValidNumber(runtime.stem) &&
      isValidNumber(runtime.gender) &&
      isValidNumber(mainIndex) &&
      fiveElement
    ) {
      const decadeDirection = getDecadeDirection(runtime.stem, runtime.gender);
      return calculateDecadeRanges(mainIndex, decadeDirection, fiveElement.fiveElementNum);
    }
    return [];
  }, [mainIndex, fiveElement, runtime.stem, runtime.gender]);

  const stemName = useMemo(() => {
    if (isValidNumber(runtime.stem)) {
      return STEM[runtime.stem];
    }
    return undefined;
  }, [runtime.stem]);

  const yearlys = useMemo(() => {
    if (isValidNumber(runtime.decade) && isValidNumber(runtime.branch)) {
      return calculateYearlys(
        decadeRanges[wrapIndex(runtime.decade - 2)][0],
        wrapIndex(runtime.branch - 2),
      );
    }
    return [];
  }, [runtime.decade, runtime.branch, JSON.stringify(decadeRanges)]);

  const getPalaceFill = (index: number) => {
    const hasZiWei = stars[index].some((star) => star === "紫微");

    if (isValidNumber(runtime.flyingPalaceIndex) && runtime.flyingPalaceIndex === index) {
      return palaceFlyFill;
    }
    if (isValidNumber(runtime.decade) && wrapIndex(runtime.decade - 2) === index) {
      return palaceHoroscopeFill;
    }
    if (hasZiWei) {
      return ziweiPalaceFill;
    }
    return boardFill;
  };

  return (
    <div className={styles.container}>
      <div id="simulator">
        <svg width={side} height={side} viewBox="0 0 660 660" shapeRendering="crispEdges">
          <g>
            <rect width={660} height={660} fill={boardFill} />
            <rect
              x={boardX}
              y={boardY}
              width={boardSide}
              height={boardSide}
              fill={boardFill}
              stroke={boardStroke}
              strokeWidth={boardStrokeWidth}
            />

            {PLACE_BRANCH.map((branch, index) => {
              const currentTransformations = stars[index].reduce<Transformation[]>(
                (result, star) => {
                  const starTransformation = calculateStarTransformation(
                    stems[oppositeIndex(index)],
                    star,
                  );
                  if (starTransformation) {
                    result.push(starTransformation);
                  }
                  return result;
                },
                [],
              );

              const selfTransformation = currentTransformations.filter((t) =>
                render.showSelfTransformation.includes(t),
              );
              const hasSelfTransformation = selfTransformation.length > 0;

              return (
                <Palace
                  key={branch}
                  width={palaceSide}
                  height={palaceSide}
                  x={palaceCoordinates[index].x}
                  y={palaceCoordinates[index].y}
                  fill={getPalaceFill(index)}
                  onClick={() => {
                    if (runtime.flyingPalaceIndex === index) {
                      runtime.setFlyingTransformations([]);
                      runtime.setFlyingPalaceIndex(undefined);
                    } else {
                      if (stems[index]) {
                        runtime.setFlyingTransformations(STEM_TRANSFORMATIONS[stems[index]]);
                        runtime.setFlyingPalaceIndex(index);
                      }
                    }
                  }}
                >
                  {/* 来因 */}
                  {render.showLaiYin && isLaiYin(branch, stemName) && (
                    <LaiYin x={laiYinFlagX} y={laiYinFlagY} type="D" />
                  )}
                  {/* 干支 */}
                  <PalaceStemBranch stem={stems[index]} branch={branch} />
                  {/* 宫职 */}
                  <PalaceName name={palaces[index]} />
                  {/* 大限宫职 */}
                  <PalaceDecadeName name={decadePalaces[index]} />
                  {/* 大限间隔 */}
                  <PalaceDecade name={decadeRanges?.[index]?.join("~")} />

                  {/* 星辰 */}
                  <PalaceStar index={index} stem={stems[index]} stars={stars[index]} />

                  <Activity
                    mode={
                      yearlys.length &&
                      yearlyPalaces.length === 0 &&
                      render.showYearly &&
                      render.showPalaceName
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <text
                      x={palaceSide / 2}
                      y={verticalRectHeight * 2 - yearlyFontSize / 2}
                      fontSize={yearlyFontSize}
                      textAnchor="middle"
                    >
                      {yearlys[index]}
                    </text>
                  </Activity>
                  <Activity
                    mode={
                      yearlyPalaces.length > 0 && render.showYearly && render.showPalaceName
                        ? "visible"
                        : "hidden"
                    }
                  >
                    <text
                      x={palaceSide / 2}
                      y={verticalRectHeight * 2 - yearlyFontSize / 2}
                      fontSize={yearlyFontSize}
                      textAnchor="middle"
                    >
                      {yearlyPalaces[index]}
                    </text>
                  </Activity>

                  {hasSelfTransformation && (
                    <Activity
                      mode={
                        selfTransformation.every((t) => render.showSelfTransformation.includes(t))
                          ? "visible"
                          : "hidden"
                      }
                    >
                      <SlefCentripetal index={index} name={selfTransformation.join("")} />
                    </Activity>
                  )}
                </Palace>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}

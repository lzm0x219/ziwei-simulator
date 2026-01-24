import type { Branch, FiveElementSchemeValue, StarName, Stem } from "../typings";
import {
  STEM,
  PLACE_BRANCH as PALACE_BRANCH,
  BRANCH,
  LAIYIN,
  PALACE,
  FIVE_ELEMENT_NUM,
  FIVE_ELEMENT_NAME,
  DECADE_PALACE,
  YEARLY_PALACE,
  STEM_TRANSFORMATIONS,
  TRANSFORMATION,
} from "../constants";
import { relativeIndex, wrapIndex } from "../utils/array";
import { isValidNumber } from "../utils/base";

export interface MetaStar {
  name: StarName;
  galaxy: "C" | "N" | "S";
  index: number;
}

// ============ Stem ============

/**
 * 起宫干：依据出生年干，按“五虎遁月诀”推算十二宫天干。
 *
 */
export function calculateStems(stem?: number) {
  if (stem === undefined || stem === Infinity) {
    return [];
  }
  // 定义每组天干对应的起始天干索引
  const startIndices = [2, 4, 6, 8, 0];
  // 计算当前天干的起始索引
  const startIndex = startIndices[stem % startIndices.length];

  return PALACE_BRANCH.map((_, i) => STEM[(startIndex + i) % STEM.length]);
}

// ============ Star ============

export function calculateStars(
  ziwei?: number,
  month?: number,
  hour?: number,
  showLocationStar: boolean = true,
) {
  let stars = calculateMajorStars(ziwei, showLocationStar);
  const monthStars = calculateMonthStars(stars, month);

  if (monthStars.length) {
    stars = monthStars;
  }

  const hourStars = calculateHourStars(stars, hour);

  if (hourStars.length) {
    stars = hourStars;
  }

  return stars;
}

export function calculateMonthStars(stars: StarName[][], month?: number) {
  if (month === undefined || month === Infinity) {
    return [];
  }

  const chenIndex = BRANCH.indexOf("辰") - 2;
  const xuIndex = BRANCH.indexOf("戌") - 2;

  const metaStars: MetaStar[] = [
    { name: "左辅", galaxy: "C", index: wrapIndex(chenIndex + month) },
    { name: "右弼", galaxy: "C", index: wrapIndex(xuIndex - month) },
  ];

  const monthStars = metaStars.reduce((result, star) => {
    result[star.index].push(star.name);
    return result;
  }, stars);

  return monthStars;
}

export function calculateHourStars(stars: StarName[][], hour?: number) {
  if (hour === undefined || hour === Infinity) {
    return [];
  }

  const chenIndex = BRANCH.indexOf("辰") - 2;
  const xuIndex = BRANCH.indexOf("戌") - 2;

  const metaStars: MetaStar[] = [
    { name: "文昌", galaxy: "C", index: wrapIndex(xuIndex - hour) },
    { name: "文曲", galaxy: "C", index: wrapIndex(chenIndex + hour) },
  ];

  const hourStars = metaStars.reduce((result, star) => {
    result[star.index].push(star.name);
    return result;
  }, stars);

  return hourStars;
}

export function calculateMajorStars(ziwei?: number, showLocationStar: boolean = true) {
  const stars = PALACE_BRANCH.map<StarName[]>(() => []);
  if (ziwei === undefined || ziwei === Infinity) {
    return stars;
  }
  const ziweiIndex = wrapIndex(ziwei - 2);
  const tianfuIndex = relativeIndex(ziweiIndex);
  const metaStars: MetaStar[] = [
    { name: "紫微", galaxy: "C", index: ziweiIndex },
    { name: "天機", galaxy: "N", index: wrapIndex(ziweiIndex - 1) },
    { name: "太陽", galaxy: "N", index: wrapIndex(ziweiIndex - 3) },
    { name: "武曲", galaxy: "N", index: wrapIndex(ziweiIndex - 4) },
    { name: "天同", galaxy: "N", index: wrapIndex(ziweiIndex - 5) },
    { name: "廉貞", galaxy: "N", index: wrapIndex(ziweiIndex - 8) },
    { name: "太陰", galaxy: "S", index: wrapIndex(tianfuIndex + 1) },
    { name: "貪狼", galaxy: "S", index: wrapIndex(tianfuIndex + 2) },
    { name: "巨門", galaxy: "S", index: wrapIndex(tianfuIndex + 3) },
    { name: "天梁", galaxy: "S", index: wrapIndex(tianfuIndex + 5) },
    { name: "破軍", galaxy: "S", index: wrapIndex(tianfuIndex + 10) },
  ];

  if (showLocationStar) {
    metaStars.push(
      { name: "天府", galaxy: "S", index: tianfuIndex },
      { name: "天相", galaxy: "S", index: wrapIndex(tianfuIndex + 4) },
      { name: "七殺", galaxy: "S", index: wrapIndex(tianfuIndex + 6) },
    );
  }

  const majorStars = metaStars.reduce((result, star) => {
    result[star.index].push(star.name);
    return result;
  }, stars);

  return majorStars;
}

export function calculateStarTransformation(stem: Stem, star: StarName) {
  const stemStarTransformation = STEM_TRANSFORMATIONS[stem];

  if (stemStarTransformation?.length) {
    const starTransformationIndex = stemStarTransformation.indexOf(star);

    // 如果指定的天干没有该星辰化曜，返回默认值
    if (starTransformationIndex === -1) {
      return undefined;
    }
    return TRANSFORMATION[starTransformationIndex];
  }
}

// ============ Palace ============

export function isLaiYin(branch: Branch, stem?: Stem): boolean {
  if (!stem) {
    return false;
  }
  return LAIYIN[stem] === branch;
}

export function calculatePalaces(mainPalaceIndex?: number, palaces: string[] = PALACE) {
  if (isValidNumber(mainPalaceIndex)) {
    return PALACE_BRANCH.map((_branch, index) => {
      const currentPalaceIndex = calculateCurrentPalaceIndex(mainPalaceIndex, index);
      return palaces[currentPalaceIndex];
    });
  }
  return [];
}

/**
 * 计算命宫的索引
 * @param monthIndex 出生月数的索引
 * @param hourIndex 出生时数的索引
 * @returns 命宫的索引
 */
export function calculateMainPalaceIndex(monthIndex: number, hourIndex: number) {
  // 寅起正月，顺月逆时为命宫
  return wrapIndex(monthIndex - hourIndex);
}

/**
 * 根据命宫索引计算当前宫位的宫职索引 - 默认从寅宫开始
 * @param mainPalaceIndex 命宫索引
 * @param currentPalaceIndex 当前宫位索引
 * @returns 当前宫位的宫职索引
 */
export function calculateCurrentPalaceIndex(mainPalaceIndex: number, currentPalaceIndex: number) {
  return wrapIndex(mainPalaceIndex - currentPalaceIndex);
}
// ============ FiveElementNum ============

/**
 *
 * @param stemKey 出生年干
 * @param branchKey 命宫地支
 * @returns
 */
export function calculateFiveElementNum(stem: number, branch: number) {
  const fixBranchIndex = wrapIndex(branch + 2);
  const fiveElementNum = FIVE_ELEMENT_NUM[stem % 5][Math.floor(fixBranchIndex / 2)];
  const fiveElementName = FIVE_ELEMENT_NAME[fiveElementNum];
  return { fiveElementNum, fiveElementName };
}

// ============ Decade ============

export function calculateDecadeRanges(
  mainIndex: number,
  decadeDirection: 1 | -1,
  fiveElementSchemeValue: FiveElementSchemeValue,
) {
  const decadeRanges: [number, number][] = Array(12);

  for (let i = 0, start = fiveElementSchemeValue; i < 12; i++, start += 10) {
    decadeRanges[wrapIndex(mainIndex + decadeDirection * i)] = [start, start + 9];
  }

  return decadeRanges;
}

export function getDecadeDirection(birthStem: number, gender: number) {
  const stemAttr = (birthStem + 1) % 2;

  return gender === stemAttr ? 1 : -1;
}

export function calculateDecadePalaces(mainPalaceIndex?: number) {
  return calculatePalaces(mainPalaceIndex, DECADE_PALACE);
}

/**
 *
 * @param decadeStart 大限开始的年龄
 * @param birthBranchIndex 生年地支所在的地支索引
 */
export function calculateYearlys(decadeStart: number, birthBranchIndex: number) {
  const yearlyStartIndex = wrapIndex(birthBranchIndex + decadeStart - 1);

  return PALACE_BRANCH.map((_, palaceIndex) => {
    // 计算当前宫位在流年序列中的偏移量
    const offset = wrapIndex(palaceIndex - yearlyStartIndex);

    // 只有在大限范围内（0-9）才有有效的流年信息
    if (offset > 9) {
      return "";
    }

    return `${decadeStart + offset} 歲`;
  });
}

export function calculateYearlyPalaces(mainPalaceIndex?: number) {
  return calculatePalaces(mainPalaceIndex, YEARLY_PALACE);
}

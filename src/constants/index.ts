import type { FiveElementSchemeValue } from "../typings";

export const BRANCH = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
] as const;

export const PLACE_BRANCH = BRANCH.map((_, i) => BRANCH[(i + 2) % 12]);

export const BRANCH_OPTIONS = BRANCH.map((branch, index) => ({
  label: branch,
  value: index,
  disabled: false,
}));

export const STEM = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;

export const STEM_OPTIONS = STEM.map((stem, index) => ({
  label: stem,
  value: index,
  disabled: false,
}));

export const MONTH = [
  "正",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "冬",
  "腊",
] as const;

export const MONTH_OPTIONS = MONTH.map((month, index) => ({
  label: month,
  value: index,
}));

export const MAJOR_STARS = [
  "紫微",
  "天機",
  "太陽",
  "武曲",
  "天同",
  "廉貞",
  "天府",
  "太陰",
  "貪狼",
  "巨門",
  "天相",
  "天梁",
  "七殺",
  "破軍",
] as const;

export const MINOR_STARS = ["左辅", "右弼", "文昌", "文曲"] as const;

export const POSITION_STARS = [" 天相", "七殺", "天府"] as const;

export const STARS = [...MAJOR_STARS, ...MINOR_STARS];

/** 十天干四化曜表 */
export const STEM_TRANSFORMATIONS: Record<(typeof STEM)[number], (typeof STARS)[number][]> = {
  甲: ["廉貞", "破軍", "武曲", "太陽"],
  乙: ["天機", "天梁", "紫微", "太陰"],
  丙: ["天同", "天機", "文昌", "廉貞"],
  丁: ["太陰", "天同", "天機", "巨門"],
  戊: ["貪狼", "太陰", "右弼", "天機"],
  己: ["武曲", "貪狼", "天梁", "文曲"],
  庚: ["太陽", "武曲", "太陰", "天同"],
  辛: ["巨門", "太陽", "文曲", "文昌"],
  壬: ["天梁", "紫微", "左辅", "武曲"],
  癸: ["破軍", "巨門", "太陰", "貪狼"],
};

export const TRANSFORMATION = ["A", "B", "C", "D"] as const;
export const TRANSFORMATION_NAME = ["祿", "權", "科", "忌"] as const;

export const LAIYIN: Record<(typeof STEM)[number], (typeof BRANCH)[number]> = {
  甲: "戌",
  乙: "酉",
  丙: "申",
  丁: "未",
  戊: "午",
  己: "巳",
  庚: "辰",
  辛: "卯",
  壬: "寅",
  癸: "亥",
};

export const PALACE = [
  "命宮",
  "兄弟",
  "夫妻",
  "子女",
  "財帛",
  "疾厄",
  "遷移",
  "交友",
  "官祿",
  "田宅",
  "福德",
  "父母",
];

export const DECADE_PALACE = [
  "大命",
  "大兄",
  "大夫",
  "大子",
  "大財",
  "大疾",
  "大遷",
  "大友",
  "大官",
  "大田",
  "大福",
  "大父",
];

export const YEARLY_PALACE = [
  "流命",
  "流兄",
  "流夫",
  "流子",
  "流財",
  "流疾",
  "流遷",
  "流友",
  "流官",
  "流田",
  "流福",
  "流父",
];

export const FIVE_ELEMENT_NUM: Record<number, FiveElementSchemeValue[]> = {
  0: [2, 6, 3, 5, 4, 6] as const,
  1: [6, 5, 4, 3, 2, 5] as const,
  2: [5, 3, 2, 4, 6, 3] as const,
  3: [3, 4, 6, 2, 5, 4] as const,
  4: [4, 2, 5, 6, 3, 2] as const,
};

export const FIVE_ELEMENT_NAME: Record<number, string> = {
  2: "水二局",
  3: "木三局",
  4: "金四局",
  5: "土五局",
  6: "火六局",
};

export const FIVE_ELEMENT_COLOR: Record<number, string> = {
  2: "#000000",
  3: "#00E09E",
  4: "#e29e28",
  5: "#D6A01D",
  6: "#C3272B",
};

export const YIN_YANG: Record<number, string> = {
  0: "陰",
  1: "陽",
} as const;

export const GENDER: Record<number, string> = {
  0: "女",
  1: "男",
} as const;

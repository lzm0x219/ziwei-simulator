import { STARS, STEM, TRANSFORMATION, BRANCH } from "../constants";

export type Stem = (typeof STEM)[number];

export type StarName = (typeof STARS)[number];

export type Transformation = (typeof TRANSFORMATION)[number];

export type Branch = (typeof BRANCH)[number];

export type FiveElementSchemeValue = 2 | 3 | 4 | 5 | 6;

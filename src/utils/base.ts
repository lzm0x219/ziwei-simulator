import { BRANCH, GENDER, STEM } from "../constants";

export function isValidNumber(n?: number): n is number {
  return n !== undefined && n !== Infinity;
}

export interface ScreenshotFilenameProps {
  stem?: number;
  branch?: number;
  ziwei?: number;
  gender?: number;
}

export function getScreenshotFilename({ stem, branch, ziwei, gender }: ScreenshotFilenameProps) {
  let name = "";
  const stemBranch = [
    isValidNumber(stem) ? STEM[stem] : "",
    isValidNumber(branch) ? BRANCH[branch] : "",
  ].join("");
  const ziweiBranch = isValidNumber(ziwei) ? BRANCH[ziwei] : "";
  const genderName = isValidNumber(gender) ? GENDER[gender] : "";

  if (stemBranch.length) {
    name += `${stemBranch}年`;
  }

  if (ziweiBranch) {
    name += `紫微在${ziweiBranch}`;
  }

  if (genderName) {
    name += `-${genderName}盤`;
  }

  return name;
}

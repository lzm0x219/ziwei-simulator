import { useState } from "react";
import { createContainer } from "../utils/hooks";

export function useRuntime() {
  const [gender, setGender] = useState<number>(1);
  const [stem, setStem] = useState<number>();
  const [branch, setBranch] = useState<number>();
  const [ziwei, setZiwei] = useState<number>();
  const [main, setMain] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [hour, setHour] = useState<number>();
  const [decade, setDecade] = useState<number>();
  const [yearly, setYearly] = useState<number>();
  const [fiveElementNum, setFiveElementNum] = useState<number>();
  const [fiveElementName, setFiveElementName] = useState<string>();

  const [flyingTransformations, setFlyingTransformations] = useState<string[]>([]);
  const [flyingPalaceIndex, setFlyingPalaceIndex] = useState<number>();

  return {
    gender,
    setGender,
    stem,
    setStem,
    branch,
    setBranch,
    ziwei,
    setZiwei,
    main,
    setMain,
    month,
    setMonth,
    hour,
    setHour,
    decade,
    setDecade,
    yearly,
    setYearly,
    fiveElementNum,
    setFiveElementNum,
    fiveElementName,
    setFiveElementName,
    flyingTransformations,
    setFlyingTransformations,
    flyingPalaceIndex,
    setFlyingPalaceIndex,
  };
}

export const RuntimeContainer = createContainer(useRuntime);

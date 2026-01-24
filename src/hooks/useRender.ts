import { useState } from "react";
import { createContainer } from "../utils/hooks";

export function useRender() {
  const [showBranch, setShowBranch] = useState<boolean>(true);
  const [showStem, setShowStem] = useState<boolean>(true);
  const [showPalaceName, setShowPalaceName] = useState<boolean>(true);
  const [showSelf, setShowSelf] = useState<boolean>(true);
  const [showLaiYin, setShowLaiYin] = useState<boolean>(true);
  const [showTransformation, setShowTransformation] = useState<string[]>(["A", "B", "C", "D"]);
  const [showSelfTransformation, setShowSelfTransformation] = useState<string[]>([
    "A",
    "B",
    "C",
    "D",
  ]);

  const [showLocationStar, setShowLocationStar] = useState<boolean>(true);
  const [showYearly, setShowYearly] = useState<boolean>(true);

  return {
    showBranch,
    setShowBranch,
    showStem,
    setShowStem,
    showPalaceName,
    setShowPalaceName,
    showSelf,
    setShowSelf,
    showLaiYin,
    setShowLaiYin,
    showTransformation,
    setShowTransformation,
    showSelfTransformation,
    setShowSelfTransformation,
    showLocationStar,
    setShowLocationStar,
    showYearly,
    setShowYearly,
  };
}

export const RenderContainer = createContainer(useRender);

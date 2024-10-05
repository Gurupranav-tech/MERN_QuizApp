import { useLayoutEffect, useState } from "react";

type ScreenType = "mobile" | "desktop";

export default function useScreenType() {
  const [screenType, setScreenType] = useState<ScreenType>("desktop");

  const calcScreenType = () => {
    const type = window.matchMedia("(max-width: 640px)").matches;
    setScreenType(type ? "mobile" : "desktop");
  };

  useLayoutEffect(() => {
    calcScreenType();
    window.addEventListener("resize", calcScreenType);

    return () => window.removeEventListener("resize", calcScreenType);
  }, []);

  return screenType;
}

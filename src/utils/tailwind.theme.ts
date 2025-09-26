import chroma from "chroma-js";

function getCssVarAsHex(cssVar: string): string {
  const styles = getComputedStyle(document.documentElement);
  return chroma(styles.getPropertyValue(cssVar)).hex();
}

export const tailwindColors = {
  blue500: getCssVarAsHex("--color-blue-500"),
  white: getCssVarAsHex("--color-white"),
  slate200: getCssVarAsHex("--color-slate-200"),
  slate400: getCssVarAsHex("--color-slate-400"),
};

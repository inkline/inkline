import type { Preflight } from "unocss";
import type { ResolvedTheme } from "@inkline/config";
import { getPrefixFromGenerator } from "../utilities";

export const visibilityPreflight: Preflight<ResolvedTheme> = {
    getCSS: ({ theme, generator }) => {
        const prefix = getPrefixFromGenerator(generator);

        return `
      ${Object.keys(theme.breakpoints)
          .filter((key) => !key.startsWith("$"))
          .map((breakpoint) => {
              const className = `.${prefix}${breakpoint}\\:visible`;
              return [className, `${className}\\!`];
          })
          .flat()
          .join(", ")} {
        display: none !important;
      }
    `;
    },
};

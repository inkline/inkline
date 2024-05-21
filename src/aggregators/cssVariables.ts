import { GeneratorType } from '../types';
import { defineAggregator } from '../utils/aggregator';
import { isDefaultTheme } from '../utils';

export const cssVariablesAggregator = defineAggregator({
    type: GeneratorType.CssVariables,
    aggregate: {
        path: (path) => {
            const replacer = ['typography', 'size'].find((part) => path[0] === part);
            if (replacer) {
                return [replacer];
            }

            return path;
        },
        content: (content, meta) => [
            `${isDefaultTheme(meta.themeName) ? ':root' : meta.themeSelector} {`,
            ...content,
            '}'
        ]
    }
});

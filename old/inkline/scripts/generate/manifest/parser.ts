import type { Block } from 'comment-parser';
import { parse } from 'comment-parser';
import type { ContextBlock, ManifestCSSVariable } from './types';

export const parseSassOptions = {
    markers: {
        start: '////',
        nostart: '// ',
        delim: '///',
        end: '////'
    }
};

export function parseBlocks(source: string, options = {}): ContextBlock[] {
    const lines: string[] = source.split('\n');
    const parsedBlocks: Block[] = parse(source, options);

    return parsedBlocks
        .map((block) => {
            const lastSourceLineNumber = block.source[block.source.length - 1].number;
            const context = [];

            let brackets = 0;
            for (
                let lineNumber = lastSourceLineNumber + 1;
                lineNumber < lines.length;
                lineNumber += 1
            ) {
                const line = lines[lineNumber];

                if (/{/.test(line)) {
                    brackets += 1;
                }

                context.push(line);

                if (/},?/.test(line)) {
                    brackets -= 1;
                }

                if (brackets === 0) {
                    break;
                }
            }

            return {
                ...block,
                context
            };
        })
        .filter((block) => block.tags.length > 0);
}

function countOccurrences(source: string, word: string): number {
    return source.split(word).length - 1;
}

function parseFallbackValue(source: string): ManifestCSSVariable[] {
    if (!source.startsWith('var(')) {
        return [
            {
                value: source
            }
        ];
    }

    const fallbackRegex = /var\(\s*(--[\w-]+)(,[^)]+)?\)/g;
    return Array.from(source.matchAll(fallbackRegex), ([_, variableName, fallbackValue]) => ({
        name: variableName,
        ...(fallbackValue
            ? {
                  value: parseFallbackValue(
                      fallbackValue.slice(1).trim() +
                          ')'.repeat(countOccurrences(fallbackValue, '('))
                  )
              }
            : {})
    }));
}

export function parseUsedCssVariables(source: string): ManifestCSSVariable[] {
    const valueRegex = /var\(\s*(--[\w-]+)(,[^;]+)?\)/g;

    return Array.from(source.matchAll(valueRegex), ([_, variableName, fallbackValue]) => {
        return {
            name: variableName,
            ...(fallbackValue ? { value: parseFallbackValue(fallbackValue.slice(1).trim()) } : {})
        };
    }).filter(
        (variable, index, array) => array.findIndex((v) => v.name === variable.name) === index
    );
}

export function parseDefinedCssVariables(source: string): ManifestCSSVariable[] {
    const valueRegex = /(--[\w-]+):\s*([^;]+);/g;
    return Array.from(source.matchAll(valueRegex), ([_, variableName, value]) => ({
        name: variableName,
        ...(value ? { value: parseFallbackValue(value.trim()) } : {})
    })).filter(
        (variable, index, array) => array.findIndex((v) => v.name === variable.name) === index
    );
}

export function parseCssSelector(source: string): string {
    const selectorRegex = /^\s*(\.[a-z-]+)/g;
    const selectorMatch = source.split('\n').find((line) => selectorRegex.test(line));

    return selectorMatch ? selectorMatch.match(selectorRegex)![0].trim() : '';
}

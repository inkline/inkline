export const codegenBreakpoints = {
    down: (key: string, nextUnitValue: string, isLast = false) => [
        `@mixin breakpoint-${key}-down {`,
        isLast ? '@content;' : `@media screen and (max-width: ${nextUnitValue}) { @content; }`,
        '}'
    ],
    up: (key: string, unitValue: string, isFirst = false) => [
        `@mixin breakpoint-${key}-up {`,
        isFirst ? '@content;' : `@media screen and (min-width: ${unitValue}) { @content; }`,
        '}'
    ],
    match: (key: string, unitValue: string, nextUnitValue: string) => [
        `@mixin breakpoint-${key} { @media screen and (min-width: ${unitValue})${nextUnitValue ? ` and (max-width: ${nextUnitValue})` : ''} { @content; }}`
    ],
    list: (breakpoints: string[]) => [
        `$breakpoint-keys: (${breakpoints.map((breakpoint) => `'${breakpoint}'`).join(', ')}) !default;`
    ],
    aggregate: (type: string, breakpoints: string[]) => {
        const suffix = type ? `-${type}` : '';
        const aggregateStrings = breakpoints.map(
            (breakpoint, index) =>
                `@${index !== 0 ? 'else ' : ''}if $key == '${breakpoint}' { @include breakpoint-${breakpoint}${suffix} { @content; } }`
        );
        return [
            `@mixin breakpoint${suffix}($key) {`,
            ...aggregateStrings.map((str) => `${str}`),
            `@else { @content; }`,
            '}'
        ];
    }
};

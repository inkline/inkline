const fs = require('fs');
const path = require('path');
const glob = require('glob');

const sizeKeys = [
    'sm', 'md', 'lg'
];

const sizeWords = {
    xs: 'extra-small',
    sm: 'small',
    md: 'medium',
    lg: 'large',
    xl: 'extra-large'
};

const colorKeys = [
    'primary', 'secondary', 'light', 'dark',
    'info', 'success', 'warning', 'danger'
];

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const generate = {
    title: (text) => {
        let output = '////\n';
        output += `/// ${text}\n`;
        output += '////\n';

        return { output };
    },
    sassGroup: (group, meta = {}) => {
        let output = `/// Map for ${group.name} ${meta.type}
/// @group ${group.name}
$${meta.id}-${meta.type}-variant-${group.name}: (
    ${group.kvMap.join(',\n    ')}
) !default;`;

        return { output };
    },
    cssGroup: (meta = {}) => {
        const output = `@each $${meta.id}-${meta.type}-variant-key, $${meta.id}-${meta.type}-variant-value in $${meta.id}-${meta.type}-variants {
        @each $${meta.id}-${meta.type}-variant-field-key, $${meta.id}-${meta.type}-variant-field-value in $${meta.id}-${meta.type}-variant-value {
            --${meta.id}-${meta.type}-variant-#{$${meta.id}-${meta.type}-variant-key}-#{$${meta.id}-${meta.type}-variant-field-key}: #{$${meta.id}-${meta.type}-variant-field-value};
        }
    }`;

        return { output };
    },
    sassGroupMap: (groups, meta = {}) => {
        const groupsOutput = groups.map((group) => `'${group.name}': $${meta.id}-${meta.type}-variant-${group.name}`).join(',\n    ');
        const output = `/// ${capitalizeFirst(meta.type)}s group map
$${meta.id}-${meta.type}-variants: (
    ${groupsOutput}
) !default;`;


        return { output };
    },
    sassVariable: (variable, meta = {}) => {
        let output = `/// ${variable.description}`;

        let name;
        let value;

        if (variable.type === 'size' && meta.group) {
            name = `$${meta.id}-size-variant-${meta.group.name}-${variable.name}`;
            value = variable.values && variable.values[meta.group.name] || `calc(var(--${meta.id}-${variable.name}) * #{size-multiplier('${meta.group.name}')})`;
        } else if (variable.type === 'color' && meta.group) {
            name = `$${meta.id}-color-variant-${meta.group.name}-${variable.name}`;
            value = variable.values[meta.group.name];
        } else {
            name = `$${meta.id}-${variable.name}`;
            value = variable.default;
        }

        output += '\n';

        if (variable.name) {
            output += `/// @name ${variable.name}\n`;
        }

        if (meta.group) {
            output += `/// @group ${meta.group.name}\n`;
        }

        if (variable.type) {
            output += `/// @type ${variable.type}\n`;
        }

        output += `${name}: ${value} !default;`;

        return {
            output,
            name,
            value
        };
    },
    cssVariable: (variable, meta = {}) => {
        const name = `--${meta.id}-${variable.name}`;
        const value = `#{$${meta.id}-${variable.name}}`;
        const output = `${name}: ${value};`;

        return {
            output,
            name,
            value
        }
    }
};

glob(path.resolve(__dirname, '..', 'src', 'components', '**', 'manifest.json'), (error, files) => {
    if (error) {
        console.error(error);
        throw error;
    }

    files.forEach((fileName) => {
        const dirname = path.dirname(fileName);
        const manifest = require(fileName);

        if (manifest.styles) {
            const defaults = manifest.styles.filter((variable) => variable.default);
            const colors = manifest.styles.filter(({ type }) => type === 'color');
            const sizes = manifest.styles.filter(({ type }) => type === 'size');

            /**
             * Base variables
             */
            const baseSassVariables = defaults
                .map((variable) => generate.sassVariable(variable, { id: manifest.name }).output);

            const baseCSSVariables = defaults
                .map((variable) => generate.cssVariable(variable, { id: manifest.name }).output);

            /**
             * Sizes
             */
            const sizeWithValues = sizes.find((s) => s.values);
            const sizeVariableGroups = (sizeWithValues ? Object.keys(sizeWithValues.values) : sizeKeys).map((key) => ({
                name: key,
                values: [],
                kvMap: []
            }));

            const sizeSassVariables = sizes
                .reduce((acc, variable) => {
                    acc.forEach((group) => {
                        const { output, name } = generate.sassVariable(variable, { group, id: manifest.name });

                        group.values.push(output);
                        group.kvMap.push(`'${variable.name}': ${name}`);
                    });

                    return acc;
                }, sizeVariableGroups)
                .map((group) => {
                    const size = group.name;

                    return `${generate.title(`${capitalizeFirst(sizeWords[size])} size`).output}
${group.values.join('\n\n')}

${generate.sassGroup(group, { id: manifest.name, type: 'size' }).output}`;
                });

            /**
             * Colors
             */
            const colorWithValues = colors.find((c) => c.values);
            const colorVariableGroups = Object.keys(colorWithValues?.values || {})
                .map((key) => ({
                    name: key,
                    values: [],
                    kvMap: []
                }));

            colorVariableGroups.sort((a, b) => {
                const aIndex = colorKeys.indexOf(a.name);
                const bIndex = colorKeys.indexOf(b.name);

                if (aIndex !== -1 && aIndex < bIndex) {
                    return -1;
                }

                if (aIndex > bIndex) {
                    return 1;
                }

                return 0;
            });

            const colorSassVariables = colors
                .reduce((acc, variable) => {
                    acc.forEach((group) => {
                        const { output, name } = generate.sassVariable(variable, { group, id: manifest.name });

                        group.values.push(output);
                        group.kvMap.push(`'${variable.name}': ${name}`);
                    });

                    return acc;
                }, colorVariableGroups)
                .map((group) => {
                    const color = group.name;

                    return `${generate.title(`${capitalizeFirst(color)} color`).output}
${group.values.join('\n\n')}

${generate.sassGroup(group, { id: manifest.name, type: 'color' }).output}`;
                });

            /**
             * Resulting _variables.scss file contents
             */
            let sassVariables = '';
            if (baseSassVariables && defaults.length > 0) {
                sassVariables += `////
/// Variables
////

${baseSassVariables.join('\n\n')}\n`;
            }

            if (sizes.length > 0 && defaults.length > 0) {
                sassVariables += '\n'
            }

            if (sizeSassVariables && sizes.length > 0) {
                sassVariables += `////
/// Sizes
////

${sizeSassVariables.join('\n\n')}

${generate.sassGroupMap(sizeVariableGroups, { id: manifest.name, type: 'size' }).output}\n`;
            }

            if (colors.length > 0 && (sizes.length > 0 || defaults.length > 0)) {
                sassVariables += '\n'
            }

            if (colorSassVariables && colors.length > 0) {
                sassVariables += `////
/// Colors
////

${colorSassVariables.join('\n\n')}

${generate.sassGroupMap(colorVariableGroups, { id: manifest.name, type: 'color' }).output}\n`;
            }


            /**
             * Resulting _css.scss file contents
             */
            let cssVariables = ':root {\n';
            if (baseSassVariables && defaults.length > 0) {
                cssVariables += `    /**
     * Variables
     */

    ${baseCSSVariables.join('\n    ')}
`;
            }

            if (sizes.length > 0 && defaults.length > 0) {
                cssVariables += '\n'
            }

            if (sizeSassVariables && sizes.length > 0) {
                cssVariables += `    /**
     * Sizes
     */

    ${generate.cssGroup({ id: manifest.name, type: 'size' }).output}
`;
            }

            if (colors.length > 0 && (sizes.length > 0 || defaults.length > 0)) {
                cssVariables += '\n'
            }

            if (colorSassVariables && colors.length > 0) {
                cssVariables += `    /**
     * Colors
     */

    ${generate.cssGroup({ id: manifest.name, type: 'color' }).output}\n`;
            }

            cssVariables += '}\n';

            fs.writeFileSync(path.join(dirname, 'css', '_css.scss'), cssVariables);
            fs.writeFileSync(path.join(dirname, 'css', '_variables.scss'), sassVariables);
        }
    });
});


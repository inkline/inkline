import {
    CodegenFile,
    CodegenGroup,
    GeneratorLocation,
    IntermediaryCodegenFile,
    ResolvedConfiguration
} from './types';
import { applyGenerators } from './applicators';
import { codegenIndent, interpolate } from './helpers';

function generateCodeForRoot(
    config: ResolvedConfiguration,
    themeName: keyof ResolvedConfiguration['theme'],
    groups: CodegenGroup[]
) {
    return `${
        themeName === 'default' ? ':root' : interpolate(config.build.themeSelector, { themeName })
    } {\n${groups
        .map(({ lines }) => lines.map((line) => codegenIndent(line)).join('\n'))
        .join('\n\n')}\n}`;
}

function generateCodeForDefault(
    config: ResolvedConfiguration,
    themeName: keyof ResolvedConfiguration['theme'],
    groups: CodegenGroup[]
) {
    return groups.map(({ lines }) => lines.join('\n')).join('\n\n');
}

/**
 * Generate code for each specific location.
 *
 * @param config
 * @param themeName
 * @param locations
 */
function generateCodeForLocations(
    config: ResolvedConfiguration,
    themeName: keyof ResolvedConfiguration['theme'],
    locations: Record<GeneratorLocation, CodegenGroup[]>
) {
    return Object.keys(locations)
        .map((location) => {
            switch (location) {
                case 'default':
                    return generateCodeForDefault(config, themeName, locations[location]);
                case 'root':
                default:
                    return generateCodeForRoot(config, themeName, locations[location]);
            }
        })
        .join('\n\n');
}

/**
 * Sort codegen groups by name and priority.
 *
 * @param groups
 */
function sortCodegenGroups(groups: CodegenGroup[]) {
    return groups.sort((a, b) => {
        if (a.priority === b.priority) {
            return a.name.localeCompare(b.name);
        }

        return a.priority - b.priority;
    });
}

// @TODO Re-write to take multiple themes into account
// export function generateSingleFile (config: ResolvedConfiguration): string {
//     const codegenGroups = applyGenerators(config, config.theme, config.theme);
//     const sortedGroups = sortCodegenGroups(codegenGroups);
//     const locations = {
//         default: sortedGroups.filter(({ location }) => location === 'default'),
//         root: sortedGroups.filter(({ location }) => location === 'root')
//     };
//
//     return generateCodeForLocations(locations);
// }

export function generate(
    config: ResolvedConfiguration
): Record<keyof ResolvedConfiguration['theme'], CodegenFile[]> {
    const extName = config.buildOptions.extName === '.css' ? '.css' : '';
    const themeKeys = Object.keys(config.theme) as (keyof ResolvedConfiguration['theme'])[];
    const themeImports = themeKeys
        .filter((key) => key !== 'default')
        .map((key) => `@import "${key}${extName ? `/index${extName}` : ''}";`);

    return themeKeys.reduce((acc, themeName) => {
        const codegenGroups = sortCodegenGroups(
            applyGenerators(config, config.theme[themeName], config.theme[themeName])
        );

        const codegenFiles: CodegenFile[] = codegenGroups
            .reduce((acc, codegenGroup) => {
                const location: GeneratorLocation = codegenGroup.location;
                let group = acc.find((group) => group.name === codegenGroup.name);
                if (!group) {
                    group = {
                        name: codegenGroup.name,
                        locations: {}
                    };

                    acc.push(group);
                }

                if (!group.locations[location]) {
                    group.locations[location] = [];
                }

                group.locations[location].push(codegenGroup);

                return acc;
            }, [] as IntermediaryCodegenFile[])
            .map((group) => ({
                name: group.name,
                contents: generateCodeForLocations(config, themeName, group.locations)
            }));

        const indexFileContents = codegenFiles
            .map((file) => `@import "${file.name}${extName}";`)
            .concat(themeName === 'default' ? themeImports : []) // Import additional themes in default theme index file
            .join('\n');

        acc[themeName] = codegenFiles.concat({
            name: 'index',
            contents: indexFileContents
        });

        return acc;
    }, {} as Record<keyof ResolvedConfiguration['theme'], CodegenFile[]>);
}

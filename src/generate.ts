import { CodegenFile, CodegenGroup, ResolvedConfiguration } from './types';
import { applyGenerators } from './apply';
import { GeneratorLocation, GeneratorLocationDefault } from './constants';
import { codegenIndent } from './helpers';
import { BuildOptions } from './build';

function sortCodegenGroups (groups: CodegenGroup[]) {
    return groups.sort((a, b) => {
        if (a.priority === b.priority) {
            return a.name.localeCompare(b.name);
        }

        return a.priority - b.priority;
    });
}

function generateCodeForLocations (locations: Record<GeneratorLocation | string, CodegenGroup[]>) {
    return (locations[GeneratorLocationDefault.None].length > 0
        ? `${
            locations[GeneratorLocationDefault.None].map(({ value }) => value.join('\n')).join('\n\n')
        }\n\n`
        : '') +
        (locations[GeneratorLocationDefault.Root].length > 0
            ? `:root {\n${
                locations[GeneratorLocationDefault.Root]
                    .map(({ value }) => value
                        .map((line) => codegenIndent(line))
                        .join('\n'))
                    .join('\n\n')
            }\n}\n`
            : '');
}

export function generateSingleFile (config: ResolvedConfiguration): string {
    const codegenGroups = applyGenerators(config as ResolvedConfiguration, config.theme);
    const sortedGroups = sortCodegenGroups(codegenGroups);
    const locations = {
        [GeneratorLocationDefault.None]: sortedGroups.filter(({ location }) => location === GeneratorLocationDefault.None),
        [GeneratorLocationDefault.Root]: sortedGroups.filter(({ location }) => location === GeneratorLocationDefault.Root)
    };

    return generateCodeForLocations(locations);
}

export function generate (config: ResolvedConfiguration, options: BuildOptions = {}): CodegenFile[] {
    const codegenGroups = applyGenerators(config as ResolvedConfiguration, config.theme);
    const sortedGroups = sortCodegenGroups(codegenGroups);
    const locatedGroups = sortedGroups.reduce((
        acc: {
            name: string;
            value: Record<GeneratorLocation, CodegenGroup[]>;
        }[],
        codegenGroup
    ) => {
        const location: GeneratorLocation = codegenGroup.location;
        let group = acc.find((group) => group.name === codegenGroup.name);
        if (!group) {
            group = {
                name: codegenGroup.name,
                value: {
                    [GeneratorLocationDefault.None]: [],
                    [GeneratorLocationDefault.Root]: []
                }
            };
            acc.push(group);
        }

        if (!group.value[location]) {
            group.value[location] = [];
        }

        group.value[location].push(codegenGroup);

        return acc;
    }, []);

    return locatedGroups.map((file) => {
        return {
            name: file.name,
            value: generateCodeForLocations(file.value)
        };
    }).concat({
        name: 'index',
        value: locatedGroups.map((file) =>
            `@import "${file.name}${options.extname === '.css' ? '.css' : ''}";`
        ).join('\n')
    });
}

import {CodegenFile, CodegenGroup, ResolvedConfiguration} from './types';
import { applyGenerators } from './apply';
import { GeneratorLocation } from './constants';
import { codegenIndent } from './helpers';

function sortCodegenGroups (groups: CodegenGroup[]) {
    return groups.sort((a, b) => {
        if (a.priority === b.priority) {
            return a.name.localeCompare(b.name);
        }

        return a.priority - b.priority;
    });
}

function localizeCodegenGroups (groups: CodegenGroup[]): Record<GeneratorLocation, CodegenGroup[]> {
    return {
        [GeneratorLocation.None]: groups.filter(({ location }) => location === GeneratorLocation.None),
        [GeneratorLocation.Root]: groups.filter(({ location }) => location === GeneratorLocation.Root)
    };
}

function generateCodeForLocations (locations: Record<GeneratorLocation, CodegenGroup[]>) {
    return (locations[GeneratorLocation.None].length > 0
        ? `${
            locations[GeneratorLocation.None].map(({ value }) => value.join('\n')).join('\n\n')
        }\n\n`
        : '') +
        (locations[GeneratorLocation.Root].length > 0
            ? `:root {\n${
                locations[GeneratorLocation.Root]
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
    const locations = localizeCodegenGroups(sortedGroups);

    return generateCodeForLocations(locations);
}

export function generate (config: ResolvedConfiguration): CodegenFile[] {
    const codegenGroups = applyGenerators(config as ResolvedConfiguration, config.theme);
    const sortedGroups = sortCodegenGroups(codegenGroups);
    const locatedGroups = sortedGroups.reduce((acc: { name: string; value: Record<GeneratorLocation, CodegenGroup[]> }[], codegenGroup) => {
        let group = acc.find((group) => group.name === codegenGroup.name);
        if (!group) {
            group = {
                name: codegenGroup.name,
                value: {
                    [GeneratorLocation.None]: [],
                    [GeneratorLocation.Root]: []
                }
            };
            acc.push(group);
        }

        group.value[codegenGroup.location].push(codegenGroup);
        return acc;
    }, []);

    return locatedGroups.map((file) => {
        return {
            name: file.name,
            value: generateCodeForLocations(file.value)
        };
    }).concat({
        name: 'index',
        value: locatedGroups.map((file) => `@import "${file.name}.css";`).join('\n')
    });
}

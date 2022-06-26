import {ResolvedConfiguration} from './types';
import {applyGenerators} from './apply';
import {GeneratorLocation} from "./constants";
import {codegenIndent} from "./helpers";

export function generate (config: ResolvedConfiguration): string {
    const codegenGroups = applyGenerators(config as ResolvedConfiguration, config.theme);

    codegenGroups.sort((a, b) => a.priority - b.priority);

    const wrappers = {
        [GeneratorLocation.None]: codegenGroups.filter(({ location }) => location === GeneratorLocation.None),
        [GeneratorLocation.Root]: codegenGroups.filter(({ location }) => location === GeneratorLocation.Root)
    };

    return `${
        wrappers[GeneratorLocation.None].map(({ value }) => value.join('\n')).join('\n\n')
    }\n\n:root {\n${
        wrappers[GeneratorLocation.Root]
            .map(({ value }) => value
                .map((line) => codegenIndent(line))
                .join('\n'))
            .join('\n\n')
    }\n}\n`;
}

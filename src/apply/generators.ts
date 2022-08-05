import { CodegenGroup, ResolvedConfiguration, Theme, UserConfiguration } from '../types';
import { GeneratorLocation, GeneratorLocationDefault, GeneratorLocationKeyword, GeneratorPriority } from '../constants';

/**
 * Recursively apply resolvers to each key value pair in the source object, setting the value in the target object
 *
 * @param config
 * @param source
 * @param target
 * @param parentPath
 */
export const applyGenerators = (
    config: ResolvedConfiguration,
    source: Theme,
    target: CodegenGroup[] = [],
    parentPath: string[] = []
): CodegenGroup[] => {
    Object.entries(source).forEach(([key, value]) => {
        const path = [...parentPath, key];
        const joinedPath = path.join('.');
        const context: UserConfiguration.ConfigurationContext<typeof value> = {
            config,
            theme: config.theme,
            path,
            value
        };

        let matches = 0;
        config.generators.forEach((generator) => {
            // Check if resolver test path matches and set resolve
            // return value at target path
            if (generator.test.test(joinedPath) && !generator.skip?.test(joinedPath)) {
                let location: GeneratorLocation = generator.location ?? GeneratorLocationDefault.Root;
                if (joinedPath.startsWith(GeneratorLocationKeyword.Schemes)) {
                    location = `${GeneratorLocationKeyword.Schemes}/${path[1]}`;
                }

                target.push({
                    name: generator.name,
                    value: generator.generate(context),
                    priority: generator.priority ?? GeneratorPriority.Low,
                    location
                });
                matches += 1;
            }
        });

        // If no generator match found and the value is an object, increase depth by one level
        // and apply generator to object fields recursively
        if (matches === 0 && typeof value === 'object') {
            applyGenerators(config, value, target, path);
        }
    });

    return target;
};

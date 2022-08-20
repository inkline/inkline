import {
    CodegenGroup,
    ConfigurationContext,
    GeneratorLocation,
    GeneratorPriority,
    ResolvedConfiguration,
    ResolvedTheme
} from '../types';

/**
 * Recursively apply generators to each key value pair in the source object, setting the value in the target object
 *
 * @param config
 * @param theme
 * @param source
 * @param target
 * @param parentPath
 */
export function applyGenerators (
    config: ResolvedConfiguration,
    theme: ResolvedTheme,
    source: ResolvedTheme | ResolvedTheme[keyof ResolvedTheme],
    target: CodegenGroup[] = [],
    parentPath: string[] = []
): CodegenGroup[] {
    Object.entries(source).forEach(([key, value]) => {
        const path = [...parentPath, key];
        const joinedPath = path.join('.');

        const context: ConfigurationContext<ResolvedTheme, typeof value> = {
            config,
            theme,
            value,
            path
        };

        let matches = 0;
        config.generators.forEach((generator) => {
            // Check if generator test path matches and type guard passes,
            // then set resolved value at target path
            if (generator.test.test(joinedPath) && !generator.skip?.test(joinedPath) && (generator.guard ? generator.guard(context) : true)) {
                const location: GeneratorLocation = generator.location ?? 'root';

                target.push({
                    name: generator.name,
                    lines: generator.apply(context),
                    priority: generator.priority ?? GeneratorPriority.Low,
                    location
                });

                matches += 1;
            }
        });

        // Increase depth and apply generators to object fields recursively
        if (matches === 0 && typeof value === 'object') {
            return applyGenerators(config, theme, value, target, path);
        }
    });

    return target;
}

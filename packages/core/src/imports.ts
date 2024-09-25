import { OutputFile } from './types';

/**
 * Output files
 *
 * Each entry represents a file that will be generated.
 */
export const files: OutputFile[] = [];

/**
 * Adds a variable to a theme.
 *
 * If `options.default` is `true`, the variable will only be added if it does not already exist in the theme.
 */
export function file(
    path: string,
    content: string,
    options?: { append?: boolean; prepend?: boolean }
) {
    files.push({ path, content, options });
}

export function applyConfigurationFiles(
    outputFiles: OutputFile[],
    configurationFiles: OutputFile[]
) {
    for (const configurationFile of configurationFiles) {
        const existingFile = outputFiles.find(
            (outputFile) => outputFile.path === configurationFile.path
        );

        if (configurationFile.options?.prepend) {
            if (existingFile) {
                existingFile.content = `${configurationFile.content}\n${existingFile.content}`;
            } else {
                outputFiles.push(configurationFile);
            }
        } else if (configurationFile.options?.append) {
            if (existingFile) {
                existingFile.content = `${existingFile.content}\n${configurationFile.content}`;
            } else {
                outputFiles.push(configurationFile);
            }
        } else {
            if (existingFile) {
                existingFile.content = configurationFile.content;
            } else {
                outputFiles.push(configurationFile);
            }
        }
    }
}

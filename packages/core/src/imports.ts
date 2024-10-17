import { OutputFile } from './types';
import { state } from './globals';
import { hash } from './utils';

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
    const id = hash(content);

    if (state.files.find((file) => file.id === id)) return;

    state.files.push({ id, path, content, options });
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

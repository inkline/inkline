import type { OutputFile } from '@inkline/core';

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

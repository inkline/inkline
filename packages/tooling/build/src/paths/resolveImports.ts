import { TsConfig } from './loadTsconfig';
import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';

/**
 * Resolve import relative to file path if applicable
 */
export function resolveImportPath(
    importPath: string,
    {
        filePath,
        extname,
        tsconfig,
        addExtname = true
    }: {
        filePath: string;
        extname: string;
        tsconfig: TsConfig;
        addExtname?: boolean;
    }
): string {
    let resolvedPath = importPath;

    const { compilerOptions, dirname: tsconfigDir } = tsconfig;
    const { baseUrl, paths, rootDir } = compilerOptions;

    // Resolve the base directory
    const baseDir = path.resolve(tsconfigDir, baseUrl);

    // Handle path aliases
    for (const [alias, aliasTargets] of Object.entries(paths)) {
        for (const aliasTarget of aliasTargets) {
            const regexAlias = new RegExp(`^${alias.replace('*', '(.*)')}$`);
            const match = resolvedPath.match(regexAlias);
            if (match) {
                resolvedPath = path.resolve(baseDir, aliasTarget.replace('*', ''), match[1]);
                break;
            }
        }
    }

    // Resolve relative to baseDir
    if (resolvedPath.startsWith('.')) {
        resolvedPath = path.resolve(baseDir, rootDir, importPath);
    }

    // Make the path relative to the file's directory
    const fileDir = path.dirname(path.resolve(baseDir, filePath));
    resolvedPath = path.relative(fileDir, resolvedPath);

    // Check if resolvedPath is directory or file
    const isDirectory = fs.existsSync(`${resolvedPath}/index.${extname}`);
    if (isDirectory) {
        resolvedPath += `/index`;
    }

    // Add the extension name
    if (addExtname) {
        resolvedPath += `.${extname}`;
    }

    // Ensure the path starts with './'
    if (!resolvedPath.startsWith('.')) {
        resolvedPath = `./${resolvedPath}`;
    }

    return resolvedPath;
}

/**
 * Detect imports for esm and cjs using regular expressions
 */
export async function resolveFileImportPaths(
    filePath: string,
    options: {
        esm: boolean;
        tsconfig: TsConfig;
        extname: string;
        addExtname: boolean;
    }
) {
    const importRegEx = options.esm
        ? /(from ['"])([^'"]+)(['"])/g
        : /(require\(['"])([^'"]+)(['"]\))/g;

    let contents = (await fs.promises.readFile(filePath)).toString();
    contents = contents.toString().replace(importRegEx, (match, ...parts: string[]) => {
        const resolvedImportPath = resolveImportPath(parts[1], {
            filePath,
            ...options
        });

        return `${parts[0]}${resolvedImportPath}${parts[2]}`;
    });
    // .replace(/(\/\/# sourceMappingURL=)(.+)/, (match, ...parts: string[]) => {
    //     return parts[0] + parts[1].replace('.js', `.${options.extname}`);
    // });

    await fs.promises.writeFile(filePath, contents);
}

/**
 *
 */
export async function resolveImports(baseDir: string, tsconfig: TsConfig) {
    const files = await glob('**/*.{js,cjs,mjs,vue}', { cwd: baseDir });

    for (const file of files) {
        const filePath = path.resolve(baseDir, file);
        const extname = path.extname(filePath).slice(1);
        const isModule = extname === 'mjs';
        const addExtname = true;

        await resolveFileImportPaths(filePath, {
            esm: isModule,
            tsconfig,
            extname,
            addExtname
        });
    }
}

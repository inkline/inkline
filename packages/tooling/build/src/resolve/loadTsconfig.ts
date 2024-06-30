import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';

export type TsConfig = {
    extends?: string;
    compilerOptions: {
        rootDir: string;
        outDir: string;
        baseUrl: string;
        paths: Record<string, string[]>;
    };
    dirname: string;
};

export const loadTsconfig = (baseDir: string, filename: string) => {
    const tsconfigPath = path.resolve(baseDir, filename);
    const tsconfigDirname = path.dirname(tsconfigPath);

    let tsconfigContents = JSON.parse(fs.readFileSync(tsconfigPath).toString()) as TsConfig;
    tsconfigContents.dirname = tsconfigDirname;

    if (tsconfigContents.extends) {
        const extendTsconfigPath = path.resolve(tsconfigDirname, tsconfigContents.extends);

        tsconfigContents = merge<TsConfig>(
            JSON.parse(fs.readFileSync(extendTsconfigPath).toString()) as TsConfig,
            tsconfigContents
        );
    }

    return tsconfigContents;
};

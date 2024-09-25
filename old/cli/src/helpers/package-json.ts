import { PackageJsonSchema } from '../types';
import { readFile, writeFile } from 'fs/promises';

export async function extendPackageJson(
    packageJsonPath: string,
    extension: PackageJsonSchema
): Promise<PackageJsonSchema> {
    const packageJsonContents = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContents) as PackageJsonSchema;

    Object.keys(extension).forEach((key: keyof PackageJsonSchema) => {
        packageJson[key] = { ...packageJson[key], ...extension[key] } as unknown;
    });

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return packageJson;
}

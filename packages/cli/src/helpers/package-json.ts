import { PackageJsonSchema } from '../types';
import { readFile, writeFile } from 'fs/promises';

export async function extendPackageJson(
    packageJsonPath: string,
    extension: PackageJsonSchema
): Promise<PackageJsonSchema> {
    const packageJsonContents = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContents);

    Object.keys(extension).forEach((key) => {
        packageJson[key] = { ...packageJson[key], ...extension[key] };
    });

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return packageJson;
}

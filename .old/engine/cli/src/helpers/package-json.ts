import { readFile, writeFile } from 'fs/promises';
import { PackageJson } from "type-fest";

export async function extendPackageJson(
    packageJsonPath: string,
    extension: PackageJson
): Promise<PackageJson> {
    const packageJsonContents = await readFile(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContents) as PackageJson;

    Object.keys(extension).forEach((key: keyof PackageJson) => {
        if (typeof packageJson[key] !== 'object' || typeof extension[key] !== 'object') {
            return;
        }

        packageJson[key] = { ...packageJson[key], ...extension[key] } as PackageJson[keyof PackageJson];
    });

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

    return packageJson;
}

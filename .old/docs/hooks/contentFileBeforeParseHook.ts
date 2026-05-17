import { resolve, extname } from 'path';
import { readFile } from 'fs/promises';
import type { FileBeforeParseHook } from '@nuxt/content';

const rootDir = resolve(__dirname, '..', '..');

export async function contentFileBeforeParseHook(ctx: FileBeforeParseHook): Promise<void> {
    const pattern = /<!--\s*:DocsCode\s*\{\s*package="([^"]+)"\s+file="([^"]+)"\s*}\s*-->/g;

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(ctx.file.body)) !== null) {
        const packagePath = match[1].replace('@inkline/component-', 'ui/components/');
        const filePath = resolve(rootDir, packagePath, 'src', match[2]);
        const fileExtname = extname(filePath).slice(1);
        const fileContent = await readFile(filePath, 'utf-8');

        ctx.file.body = ctx.file.body.replace(
            match[0],
            `\`\`\`${fileExtname}\n${fileContent}\n\`\`\``
        );
    }
}

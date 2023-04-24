import { ImportFileMeta } from '../types';
import { findLastImportLineIndex } from './find-index';

export function importFromExists(code: string, importMeta: { from: ImportFileMeta['from'] }) {
    return new RegExp(`from ['"]${importMeta.from}['"]`).test(code);
}

export function addImport(code: string, importMeta: ImportFileMeta) {
    if (importFromExists(code, importMeta)) {
        return updateExistingImport(code, importMeta);
    }

    return insertImport(code, importMeta);
}

export function insertImport(code: string, importMeta: ImportFileMeta) {
    const lastImportLineIndex = findLastImportLineIndex(code);
    const importStatement = `import ${importMeta.type ? 'type ' : ''}${
        Array.isArray(importMeta.name) ? `{ ${importMeta.name.join(', ')} }` : importMeta.name
    } from '${importMeta.from}';`;

    if (lastImportLineIndex !== -1) {
        const lines = code.split('\n');
        lines.splice(lastImportLineIndex + 1, 0, importStatement);
        return lines.join('\n');
    }

    return `${importStatement}\n\n${code}`;
}

export function updateExistingImport(code: string, importMeta: ImportFileMeta) {
    const importMatch = new RegExp(
        `import\\s+([a-zA-Z0-9$_]+)?(,?\\s*{\\s*([\\w\\s,]+)\\s*})?\\s+from\\s+['"]${importMeta.from}['"]`,
        'g'
    );

    return code.replace(importMatch, (match, defaultImport, namedImportsGroup, namedImports) => {
        const isImportMetaDefaultImport = !Array.isArray(importMeta.name);
        const existingNamedImports = namedImports
            ? namedImports.split(',').map((name: string) => name.trim())
            : [];

        const newNamedImports = isImportMetaDefaultImport
            ? [...existingNamedImports]
            : [...existingNamedImports, ...importMeta.name];
        const newDefaultImport = isImportMetaDefaultImport ? importMeta.name : defaultImport;

        return `import ${newDefaultImport || ''}${
            newNamedImports.length > 0
                ? `${newDefaultImport ? ', ' : ''}{ ${newNamedImports.join(', ')} }`
                : ''
        } from '${importMeta.from}'`;
    });
}

export function findDefaultExportLineIndex(code: string) {
    const exportDefaultRegEx = /(export\s+default|module\.exports\s*=)/g;

    return code.split('\n').findIndex((line) => exportDefaultRegEx.test(line));
}

export function addFieldToDefaultExport(code: string, field: string, value: string | string[]) {
    const exportDefaultLineIndex = findDefaultExportLineIndex(code);
    const fieldValue = Array.isArray(value) ? `[${value.join(', ')}]` : value;
    const fieldValuePreExisting = Array.isArray(value) ? value.join(', ') : value;
    const fieldSearchRegEx = new RegExp(`(\\s*['"]?${field}['"]?:\\s*\\[)`, 'g');

    let updatedCode = code;

    // If default export found, add field to it
    if (exportDefaultLineIndex !== -1) {
        const lines = updatedCode.split('\n');

        // If default export is a single line, add field to it
        if (
            lines[exportDefaultLineIndex].includes('{') &&
            lines[exportDefaultLineIndex].includes('}')
        ) {
            lines[exportDefaultLineIndex] = lines[exportDefaultLineIndex]
                .replace(/\{/g, '{\n')
                .replace(/}/g, '\n}');
        }

        if (fieldSearchRegEx.test(updatedCode)) {
            updatedCode = lines.join('\n');
            updatedCode = updatedCode.replace(fieldSearchRegEx, `$1${fieldValuePreExisting}, `);
        } else {
            lines[exportDefaultLineIndex] = lines[exportDefaultLineIndex].replace(
                /(\{\n?)/,
                `{\n    ${field}: ${fieldValue},`
            );
            updatedCode = lines.join('\n');
        }

        return updatedCode;
    }

    return `${code}\n\nexport default {\n    ${field}: ${fieldValue}\n};`;
}

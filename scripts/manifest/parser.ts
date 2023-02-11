import fs from 'fs';
import { Block, parse } from 'comment-parser';
import { ContextBlock } from './types';

export const parseSassOptions = {
    markers: {
        start: '////',
        nostart: '// ',
        delim: '///',
        end: '////'
    }
};

export const parseBlocks = (filePath: string, options = {}): ContextBlock[] => {
    const source = fs.existsSync(filePath) ? fs.readFileSync(filePath).toString() : '';
    const lines: string[] = source.split('\n');
    const blocks: Block[] = parse(source, options);

    return blocks
        .map((block) => {
            const lastSourceLineNumber = block.source[block.source.length - 1].number;
            const context = [];

            let brackets = 0;
            for (
                let lineNumber = lastSourceLineNumber + 1;
                lineNumber < lines.length;
                lineNumber += 1
            ) {
                const line = lines[lineNumber];

                if (/{/.test(line)) {
                    brackets += 1;
                }

                context.push(line);

                if (/},?/.test(line)) {
                    brackets -= 1;
                }

                if (brackets === 0) {
                    break;
                }
            }

            return {
                ...block,
                context
            };
        })
        .filter((block) => block.tags.length > 0);
};

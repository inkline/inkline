import { GroupToken, Parser, Plugin, Theme } from '../types';
import { applyParsers } from '../config/apply';

export const theme: Plugin<{}, Theme, GroupToken> = (options) => {
    const parser: Parser<Theme, GroupToken> = {
        test: ({ path }) => /theme$/.test(path),
        resolve ({ value, path, config }) {
            const { overrides, ...target } = value;
            const themes: GroupToken[] = [
                {
                    type: 'group',
                    name: '',
                    items: applyParsers(config, target, [path])
                }
            ];

            console.log(themes);

            return themes;
        }
    };

    return {
        parsers: [parser],
        generators: []
    };
};

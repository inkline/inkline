import { Parser, Plugin } from '../types';

export const spacing: Plugin = () => {
    const parser: Parser = (path, value) => {
        if (/(margin|padding$)/.match(path)) {
            return [];
        }
    };

    return {
        parser
    };
};

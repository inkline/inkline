import { theme } from '../theme';
import {Configuration, Parser} from '../../types';
import {spacing} from "../spacing";

describe('plugins', () => {
    describe('theme', () => {
        describe('parser', () => {
            const plugin = theme();
            const parser = plugin.parsers[0];

            const config = {
                theme: {}
            } as Configuration;

            describe('test()', () => {
                it('should pass test for direct value path', () => {
                    expect(parser.test({
                        config,
                        path: 'theme',
                        value: config.theme
                    })).toEqual(true);
                });
            });

            describe('resolve()', () => {
                it('should return a group token', () => {
                    expect(parser.resolve({
                        config,
                        path: '',
                        value: config.theme
                    })).toEqual([
                        {
                            type: 'group',
                            name: '',
                            items: []
                        }
                    ]);
                });

                it('should return a group token with parsed items', () => {
                    const { parsers: [spacingParser] } = spacing();
                    const config = {
                        parsers: [
                            spacingParser
                        ] as Parser[],
                        theme: {
                            margin: '1rem 2rem 3rem 4rem'
                        }
                    } as Configuration;

                    expect(parser.resolve({
                        config,
                        path: 'theme',
                        value: config.theme
                    })).toEqual([
                        {
                            type: 'group',
                            name: '',
                            items: [
                                { type: 'variable', name: 'margin-top', value: '1rem' },
                                { type: 'variable', name: 'margin-right', value: '2rem' },
                                { type: 'variable', name: 'margin-bottom', value: '3rem' },
                                { type: 'variable', name: 'margin-left', value: '4rem' },
                                {
                                    type: 'variable',
                                    name: 'margin',
                                    value: [
                                        { type: 'variable', name: 'margin-top' },
                                        { type: 'variable', name: 'margin-right' },
                                        { type: 'variable', name: 'margin-bottom' },
                                        { type: 'variable', name: 'margin-left' }
                                    ]
                                }
                            ]
                        }
                    ]);
                });
            });
        });
    });
});

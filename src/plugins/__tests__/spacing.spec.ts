import { spacing } from '../spacing';
import { ParserContext, SpacingProperty } from '../../types';

describe('plugins', () => {
    describe('spacing', () => {
        describe('parser', () => {
            const plugin = spacing();
            const parser = plugin.parsers[0];

            ['margin', 'padding'].forEach((path) => {
                describe(path, () => {
                    describe('test()', () => {
                        it('should pass test for direct value path', () => {
                            const context: ParserContext<SpacingProperty> = {
                                path,
                                value: '1rem'
                            };

                            expect(parser.test(context)).toEqual(true);
                        });

                        it('should pass test for nested value path', () => {
                            const context: ParserContext<SpacingProperty> = {
                                path: `nested.${path}`,
                                value: '1rem'
                            };

                            expect(parser.test(context)).toEqual(true);
                        });
                    });

                    describe('resolve()', () => {
                        it('should return side tokens', () => {
                            const context: ParserContext<SpacingProperty> = {
                                path,
                                value: '1rem'
                            };

                            const result = parser.resolve(context);

                            expect(result).toEqual([
                                { type: 'variable', name: `${path}-top`, value: '1rem' },
                                { type: 'variable', name: `${path}-right`, value: '1rem' },
                                { type: 'variable', name: `${path}-bottom`, value: '1rem' },
                                { type: 'variable', name: `${path}-left`, value: '1rem' },
                                {
                                    type: 'variable',
                                    name: `${path}`,
                                    value: [
                                        { type: 'variable', name: `${path}-top` },
                                        { type: 'variable', name: `${path}-right` },
                                        { type: 'variable', name: `${path}-bottom` },
                                        { type: 'variable', name: `${path}-left` }
                                    ]
                                }
                            ]);
                        });
                    });
                });
            });
        });
    });
});

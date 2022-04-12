import { parseSidesValue } from '../parseSidesValue';
import { defaultConfig as config } from '../../../config/defaults';
import { Configuration } from '../../../types';

describe('helpers', () => {
    describe('parser', () => {
        describe('parseSidesValue()', () => {
            describe('string', () => {
                it('should parse one part string value', () => {
                    expect(parseSidesValue(config, '1rem')).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });

                it('should parse two part string value', () => {
                    expect(parseSidesValue(config, '1rem 2rem')).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '1rem',
                        left: '2rem'
                    });
                });

                it('should parse three part string value', () => {
                    expect(parseSidesValue(config, '1rem 2rem 3rem')).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '3rem',
                        left: '2rem'
                    });
                });

                it('should parse four part string value', () => {
                    expect(parseSidesValue(config, '1rem 2rem 3rem 4rem')).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '3rem',
                        left: '4rem'
                    });
                });
            });

            describe('array', () => {
                it('should parse one part array value', () => {
                    expect(parseSidesValue(config, ['1rem'])).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });

                it('should parse two part array value', () => {
                    expect(parseSidesValue(config, ['1rem', '2rem'])).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '1rem',
                        left: '2rem'
                    });
                });

                it('should parse three part array value', () => {
                    expect(parseSidesValue(config, ['1rem', '2rem', '3rem'])).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '3rem',
                        left: '2rem'
                    });
                });

                it('should parse four part array value', () => {
                    expect(parseSidesValue(config, ['1rem', '2rem', '3rem', '4rem'])).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '3rem',
                        left: '4rem'
                    });
                });
            });

            describe('object', () => {
                it('should parse empty object value with fallback value', () => {
                    expect(parseSidesValue(config, {})).toEqual({
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    });
                });

                it('should parse object value with "default" fallback field', () => {
                    expect(parseSidesValue(config, {
                        default: '1rem'
                    })).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });

                it('should parse object value with "top" field and fallback value', () => {
                    expect(parseSidesValue(config, {
                        top: '1rem'
                    })).toEqual({
                        top: '1rem',
                        right: '0',
                        bottom: '0',
                        left: '0'
                    });
                });

                it('should parse object value with "top" field and "default" fallback field', () => {
                    expect(parseSidesValue(config, {
                        default: '1rem',
                        top: '1rem'
                    })).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });

                it('should parse object value with "top", "right", "bottom", and "left" fields', () => {
                    expect(parseSidesValue(config, {
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    })).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });

                it('should parse object value with "default" fallback field', () => {
                    expect(parseSidesValue(config, {
                        default: '1rem'
                    })).toEqual({
                        top: '1rem',
                        right: '1rem',
                        bottom: '1rem',
                        left: '1rem'
                    });
                });
            });

            describe('function', () => {
                it('should parse function value and pass theme configuration', () => {
                    expect(parseSidesValue(
                        {
                            theme: {
                                margin: '1rem 2rem 3rem 4rem'
                            }
                        } as Configuration,
                        ({ theme }) => theme.margin
                    )).toEqual({
                        top: '1rem',
                        right: '2rem',
                        bottom: '3rem',
                        left: '4rem'
                    });
                });
            });

            describe('number', () => {
                it('should parse number value', () => {
                    expect(parseSidesValue(config, 10)).toEqual({
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    });
                });
            });
        });
    });
});

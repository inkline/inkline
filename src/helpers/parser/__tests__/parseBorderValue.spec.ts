import { parseBorderValue } from '../parseBorderValue';
import { defaultConfig as config } from '../../../config/defaults';
import { Configuration } from '../../../types';

describe('helpers', () => {
    describe('parser', () => {
        describe('parseBorderValue()', () => {
            describe('string', () => {
                it('should parse string value', () => {
                    expect(parseBorderValue(config, '1px solid #000000')).toEqual({
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        bottom: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        left: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        }
                    });
                });
            });

            describe('object', () => {
                it('should parse object with single width, style, color', () => {
                    expect(parseBorderValue(config, {
                        width: '1px',
                        style: 'solid',
                        color: '#000000'
                    })).toEqual({
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        bottom: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        left: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        }
                    });
                });

                it('should parse object with four sides width, style, color', () => {
                    expect(parseBorderValue(config, {
                        width: '1px 2px 3px 4px',
                        style: 'solid dotted dashed double',
                        color: '#000000 #111111 #222222 #333333'
                    })).toEqual({
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '2px',
                            style: 'dotted',
                            color: '#111111'
                        },
                        bottom: {
                            width: '3px',
                            style: 'dashed',
                            color: '#222222'
                        },
                        left: {
                            width: '4px',
                            style: 'double',
                            color: '#333333'
                        }
                    });
                });

                it('should parse object with top, left, right, bottom strings', () => {
                    expect(parseBorderValue(config, {
                        top: '1px solid #000000',
                        right: '2px dotted #111111',
                        bottom: '3px dashed #222222',
                        left: '4px double #333333'
                    })).toEqual({
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '2px',
                            style: 'dotted',
                            color: '#111111'
                        },
                        bottom: {
                            width: '3px',
                            style: 'dashed',
                            color: '#222222'
                        },
                        left: {
                            width: '4px',
                            style: 'double',
                            color: '#333333'
                        }
                    });
                });

                it('should parse object with top, left, right, bottom objects', () => {
                    expect(parseBorderValue(config, {
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '2px',
                            style: 'dotted',
                            color: '#111111'
                        },
                        bottom: {
                            width: '3px',
                            style: 'dashed',
                            color: '#222222'
                        },
                        left: {
                            width: '4px',
                            style: 'double',
                            color: '#333333'
                        }
                    })).toEqual({
                        top: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        right: {
                            width: '2px',
                            style: 'dotted',
                            color: '#111111'
                        },
                        bottom: {
                            width: '3px',
                            style: 'dashed',
                            color: '#222222'
                        },
                        left: {
                            width: '4px',
                            style: 'double',
                            color: '#333333'
                        }
                    });
                });

                it('should parse object with default width, style, color and top, right override objects', () => {
                    expect(parseBorderValue(config, {
                        width: '1px',
                        style: 'solid',
                        color: '#000000',
                        top: {
                            width: '2px',
                            style: 'dashed',
                            color: '#111111'
                        },
                        right: {
                            width: '3px',
                            style: 'dotted',
                            color: '#222222'
                        }
                    })).toEqual({
                        top: {
                            width: '2px',
                            style: 'dashed',
                            color: '#111111'
                        },
                        right: {
                            width: '3px',
                            style: 'dotted',
                            color: '#222222'
                        },
                        bottom: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        },
                        left: {
                            width: '1px',
                            style: 'solid',
                            color: '#000000'
                        }
                    });
                });
            });
        });
    });
});
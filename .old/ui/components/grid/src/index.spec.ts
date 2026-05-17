import { render } from '@testing-library/vue';
import { Grid } from './index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import { toKebabCase } from '@inkline/utils';

describe('Components', () => {
    describe('Grid', () => {
        it('should be named correctly', () => {
            expect(Grid.name).toEqual('Grid');
        });

        it('should render correctly', () => {
            const wrapper = render(Grid, {
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes correctly', () => {
                    const wrapper = render(Grid, {
                        props: {
                            container: true,
                            noGap: true,
                            noWrap: true
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        'grid',
                        '-container',
                        '-no-gap',
                        '-no-wrap'
                    );
                });

                [
                    ['direction', 'row'],
                    ['direction', 'row-reverse'],
                    ['direction', 'column'],
                    ['direction', 'column-reverse'],
                    ['alignItems', 'flex-start'],
                    ['alignItems', 'flex-end'],
                    ['alignItems', 'center'],
                    ['alignItems', 'baseline'],
                    ['alignItems', 'stretch'],
                    ['justifyContent', 'flex-start'],
                    ['justifyContent', 'flex-end'],
                    ['justifyContent', 'center'],
                    ['justifyContent', 'space-between'],
                    ['justifyContent', 'space-around'],
                    ['justifyContent', 'space-evenly']
                ].forEach(([property, value]) => {
                    const className = toKebabCase(property);

                    it(`should add responsive "${className}-${value}" string value classes correctly`, () => {
                        const wrapper = render(Grid, {
                            props: {
                                [property]: value,
                                [`${property}Xs`]: value,
                                [`${property}Sm`]: value,
                                [`${property}Md`]: value,
                                [`${property}Lg`]: value,
                                [`${property}Xl`]: value
                            },
                            global: {
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            }
                        });

                        expect(wrapper.container.firstChild).toHaveClass(
                            `-${className}-${value}`,
                            `-xs:${className}-${value}`,
                            `-sm:${className}-${value}`,
                            `-md:${className}-${value}`,
                            `-lg:${className}-${value}`,
                            `-xl:${className}-${value}`
                        );
                    });
                });

                [
                    ['xs', 1],
                    ['sm', 2],
                    ['md', 3],
                    ['lg', 4],
                    ['xl', 5]
                ].forEach(([property, value]) => {
                    it(`should add responsive size "${property}" string value classes correctly`, () => {
                        const wrapper = render(Grid, {
                            props: {
                                [property]: value
                            },
                            global: {
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            }
                        });

                        expect(wrapper.container.firstChild).toHaveClass(
                            `-${property}:size-${value}`
                        );
                    });
                });

                it(`should add "size" string value classes correctly`, () => {
                    const wrapper = render(Grid, {
                        props: {
                            size: 6
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-size-6`);
                });

                it(`should add responsive "size" object classes correctly`, () => {
                    const wrapper = render(Grid, {
                        props: {
                            size: {
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3,
                                xl: 2
                            }
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-xs:size-12',
                        '-sm:size-6',
                        '-md:size-4',
                        '-lg:size-3',
                        '-xl:size-2'
                    );
                });
            });
        });
    });
});

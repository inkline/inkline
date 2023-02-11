import { render } from '@testing-library/vue';
import { IRow } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IRow', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IRow.name).toEqual('IRow');
        });

        it('should render correctly', () => {
            const wrapper = render(IRow, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IRow, {
                        props: {
                            noGutter: true,
                            noCollapse: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-no-gutter', '-no-collapse');
                });

                [
                    'start',
                    'center',
                    'end',
                    'top',
                    'middle',
                    'bottom',
                    'around',
                    'between',
                    'reverse'
                ].forEach((position) => {
                    it(`should add "${position}" classes based on props`, () => {
                        const wrapper = render(IRow, {
                            props: {
                                [position]: true,
                                [`${position}Xs`]: true,
                                [`${position}Sm`]: true,
                                [`${position}Md`]: true,
                                [`${position}Lg`]: true,
                                [`${position}Xl`]: true,
                                [`${position}2xl`]: true,
                                ...props
                            },
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });

                        expect(wrapper.container.firstChild).toHaveClass(
                            `-${position}`,
                            `-${position}-xs`,
                            `-${position}-sm`,
                            `-${position}-md`,
                            `-${position}-lg`,
                            `-${position}-xl`,
                            `-${position}-2xl`
                        );
                    });
                });
            });
        });
    });
});

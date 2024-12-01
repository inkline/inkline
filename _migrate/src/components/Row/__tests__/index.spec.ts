import { render } from '@testing-library/vue';
import { Row } from '@inkline/inkline/components';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Row', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(Row.name).toEqual('Row');
        });

        it('should render correctly', () => {
            const wrapper = render(Row, {
                props,
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
                it('should add classes based on props', () => {
                    const wrapper = render(Row, {
                        props: {
                            noGutter: true,
                            noCollapse: true
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                        const wrapper = render(Row, {
                            props: {
                                [position]: true,
                                [`${position}Xs`]: true,
                                [`${position}Sm`]: true,
                                [`${position}Md`]: true,
                                [`${position}Lg`]: true,
                                [`${position}Xl`]: true,
                                [`${position}Xxl`]: true,
                                ...props
                            },
                            global: {
                                provide: {
                                    ...createTestingInklineOptionsProvide()
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
                            `-${position}-xxl`
                        );
                    });
                });
            });
        });
    });
});

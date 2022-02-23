import { render } from '@testing-library/vue';
import { IColumn } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IColumn', () => {
        const props = {
            xs: 12,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 12
        };

        it('should be named correctly', () => {
            expect(IColumn.name).toEqual('IColumn');
        });

        it('should render correctly', () => {
            const wrapper = render(IColumn, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IColumn, {
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-xs-12',
                        '-sm-12',
                        '-md-12',
                        '-lg-12',
                        '-xl-12',
                        '-xxl-12'
                    );
                });

                ['first', 'last'].forEach((position) => {
                    it(`should add "${position}" classes based on props`, () => {
                        const wrapper = render(IColumn, {
                            props: {
                                [position]: true,
                                [`${position}Xs`]: true,
                                [`${position}Sm`]: true,
                                [`${position}Md`]: true,
                                [`${position}Lg`]: true,
                                [`${position}Xl`]: true,
                                [`${position}Xxl`]: true,
                                ...props
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

                ['offset', 'push', 'pull'].forEach((action) => {
                    it(`should add "${action}" classes based on props`, () => {
                        const wrapper = render(IColumn, {
                            props: {
                                [action]: 6,
                                [`${action}Xs`]: 6,
                                [`${action}Sm`]: 6,
                                [`${action}Md`]: 6,
                                [`${action}Lg`]: 6,
                                [`${action}Xl`]: 6,
                                [`${action}Xxl`]: 6,
                                ...props
                            }
                        });

                        expect(wrapper.container.firstChild).toHaveClass(
                            `-${action}-6`,
                            `-${action}-xs-6`,
                            `-${action}-sm-6`,
                            `-${action}-md-6`,
                            `-${action}-lg-6`,
                            `-${action}-xl-6`,
                            `-${action}-xxl-6`
                        );
                    });
                });
            });
        });
    });
});

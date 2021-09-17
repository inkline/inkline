import { fireEvent, render } from '@testing-library/vue';
import { ITabTitle } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ITabTitle', () => {
        const props = {
            for: 'tab'
        };

        it('should be named correctly', () => {
            expect(ITabTitle.name).toEqual('ITabTitle');
        });

        it('should render correctly', () => {
            const wrapper = render(ITabTitle, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('for', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ITabTitle);

                    expect(wrapper.container.firstChild).toHaveAttribute('for', expect.stringContaining('tab'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should have \'-active\' class if active', () => {
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                tabs: {
                                    active: 'tab'
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-active'
                    );
                });

                it('should not have \'-active\' class if not active', () => {
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                tabs: {
                                    active: 'other'
                                }
                            }
                        },
                        props
                    });

                    expect(wrapper.container.firstChild).not.toHaveClass(
                        '-active'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should have call tabs setActive', async () => {
                    const setActive = jest.fn();
                    const wrapper = render(ITabTitle, {
                        global: {
                            provide: {
                                tabs: {
                                    setActive
                                }
                            }
                        },
                        props
                    });

                    await fireEvent.click(wrapper.container.firstChild as Element);

                    expect(setActive).toHaveBeenCalledWith(props.for);
                });
            });
        });
    });
});

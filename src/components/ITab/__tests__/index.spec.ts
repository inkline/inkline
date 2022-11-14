import { render } from '@testing-library/vue';
import { ITab } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ITab', () => {
        const props = {
            name: 'tab'
        };

        it('should be named correctly', () => {
            expect(ITab.name).toEqual('ITab');
        });

        it('should render correctly', () => {
            const wrapper = render(ITab, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', () => {
                    const wrapper = render(ITab);

                    expect(wrapper.container.firstChild).toHaveAttribute('name', expect.stringContaining('tab'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should have \'-active\' class if active', () => {
                    const wrapper = render(ITab, {
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
                    const wrapper = render(ITab, {
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
    });
});

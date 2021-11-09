import { render } from '@testing-library/vue';
import { IFormLabel } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IFormLabel', () => {
        const props = {
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IFormLabel.name).toEqual('IFormLabel');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormLabel, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IFormLabel, {
                        props: {
                            placement: 'left',
                            ...props
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.size}`,
                        '-left'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should focus next sibling if for not provided', async () => {
                    const focus = jest.fn();
                    const wrapper = {
                        $el: {
                            nextSibling: {
                                querySelector: () => ({
                                    focus
                                })
                            }
                        },
                        ...IFormLabel.methods
                    };

                    (wrapper as any).onClick();

                    expect(focus).toHaveBeenCalled();
                });

                it('should not focus next sibling if not focusable', async () => {
                    const focus = jest.fn();
                    const wrapper = {
                        $el: {
                            nextSibling: {
                                querySelector: () => null
                            }
                        },
                        ...IFormLabel.methods
                    };

                    (wrapper as any).onClick();

                    expect(focus).not.toHaveBeenCalled();
                });

                it('should not focus next sibling if for provided', async () => {
                    const focus = jest.fn();
                    const wrapper = {
                        for: true,
                        $el: {
                            nextSibling: {
                                querySelector: () => ({
                                    focus
                                })
                            }
                        },
                        ...IFormLabel.methods
                    };

                    (wrapper as any).onClick();

                    expect(focus).not.toHaveBeenCalled();
                });
            });
        });
    });
});

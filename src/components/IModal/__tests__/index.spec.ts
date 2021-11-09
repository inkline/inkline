import { fireEvent, render } from '@testing-library/vue';
import { IModal } from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';

describe('Components', () => {
    describe('IModal', () => {
        const props = {
            name: 'modal',
            color: 'light',
            size: 'md'
        };

        const slots = {
            header: ['Header'],
            default: ['Body'],
            footer: ['Footer']
        };

        it('should be named correctly', () => {
            expect(IModal.name).toEqual('IModal');
        });

        it('should render correctly', () => {
            const wrapper = render(IModal, {
                props: {
                    modelValue: true,
                    ...props
                },
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(IModal, {
                        props: {
                            modelValue: true,
                            color: props.color,
                            size: props.size
                        }
                    });
                    const modal = await wrapper.getByRole('dialog');

                    expect(modal).toHaveAttribute('name', expect.stringContaining('modal'));
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(IModal, {
                        props: {
                            modelValue: true,
                            disabled: true,
                            ...props
                        }
                    });
                    const modal = await wrapper.getByRole('dialog');

                    expect(modal).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-disabled'
                    );
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should open modal', () => {
                    const wrapper = createMockInstance(IModal, { props });

                    wrapper.show();

                    expect(wrapper.$emit).toHaveBeenCalledWith('update:modelValue', true);
                });

                it('should not open modal if disabled', () => {
                    const wrapper = createMockInstance(IModal, {
                        props: {
                            ...props,
                            disabled: true
                        }
                    });

                    wrapper.show();

                    expect(wrapper.$emit).not.toHaveBeenCalled();
                });

                it('should open modal when updating v-model', async () => {
                    const wrapper = render({
                        template: `<div>
                            <i-modal v-model="visible" color="light" size="md" />
                            <button @click="visible = !visible"></button>
                        </div>`,
                        data: () => ({ visible: false })
                    }, {
                        global: {
                            stubs: {
                                'i-modal': IModal
                            }
                        }
                    });

                    const button = await wrapper.getByRole('button');
                    await fireEvent.click(button);

                    const modal = await wrapper.getByRole('dialog');
                    expect(modal).toBeVisible();
                });
            });

            describe('hide()', () => {
                it('should close modal if open', async () => {
                    const wrapper = render(IModal, {
                        props: {
                            ...props,
                            modelValue: true
                        },
                        slots
                    });

                    const modal = await wrapper.getByRole('dialog');
                    const button = wrapper.container.querySelector('.close');

                    await fireEvent.click(button as Element);

                    expect(modal).not.toBeVisible();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });

                it('should not close modal if open and disabled', async () => {
                    const wrapper = render(IModal, {
                        props: {
                            ...props,
                            disabled: true,
                            modelValue: true
                        },
                        slots
                    });

                    const modal = await wrapper.getByRole('dialog');
                    const button = wrapper.container.querySelector('.close');

                    await fireEvent.click(button as Element);

                    expect(modal).toBeVisible();
                    expect(wrapper.emitted()['update:modelValue']).not.toBeDefined();
                });
            });

            describe('onClickOutside()', () => {
                it('should hide modal if hideOnClickOutside', async () => {
                    const wrapper = createMockInstance(IModal, {
                        props
                    });

                    wrapper.onClickOutside();

                    expect(wrapper.hide).toHaveBeenCalled();
                });

                it('should not hide modal if not hideOnClickOutside', async () => {
                    const wrapper = createMockInstance(IModal, {
                        props: {
                            ...props,
                            hideOnClickOutside: false
                        }
                    });

                    wrapper.onClickOutside();

                    expect(wrapper.hide).not.toHaveBeenCalled();
                });
            });
        });

        describe('watch', () => {
            describe('modelValue', () => {
                it('should show modal if true', () => {
                    const wrapper = {
                        show: jest.fn(),
                        hide: jest.fn(),
                        fn: (IModal as any).watch.modelValue
                    };

                    wrapper.fn(true);

                    expect(wrapper.show).toHaveBeenCalled();
                });

                it('should hide modal if false', () => {
                    const wrapper = {
                        show: jest.fn(),
                        hide: jest.fn(),
                        fn: (IModal as any).watch.modelValue
                    };

                    wrapper.fn(false);

                    expect(wrapper.hide).toHaveBeenCalled();
                });
            });
        });
    });
});

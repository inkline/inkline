import { fireEvent, render } from '@testing-library/vue';
import { IModal } from '@inkline/inkline/components';

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
            describe('show', () => {
                it('should open modal if closed', async () => {
                    const wrapper = render({
                        template: `<div>
                            <i-modal v-model="show" color="light" size="md" />
                            <button @click="show = !show"></button>
                        </div>`,
                        data: () => ({ show: false })
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

                it('should close modal if open', async () => {
                    const wrapper = render({
                        template: `<div>
                            <i-modal v-model="show" disabled color="light" size="md" />
                            <button @click="show = !show"></button>
                        </div>`,
                        data: () => ({ show: true })
                    }, {
                        global: {
                            stubs: {
                                'i-modal': IModal
                            }
                        }
                    });

                    const button = await wrapper.getByRole('button');
                    await fireEvent.click(button);

                    const modal = wrapper.container.querySelector('[role="dialog"]');
                    expect(modal).not.toBeVisible();
                });
            });
        });
    });
});

import { fireEvent, render } from '@testing-library/vue';
import { IModal } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

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
                slots,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
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
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const modal = await wrapper.getByRole('dialog');

                    expect(modal).toHaveClass(`-${props.color}`, `-${props.size}`, '-disabled');
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should open modal when updating v-model', async () => {
                    const wrapper = render(
                        {
                            template: `<div>
                                <i-modal v-model="visible" color="light" size="md" />
                                <button @click="visible = !visible"></button>
                            </div>`,
                            data: () => ({ visible: false })
                        },
                        {
                            global: {
                                stubs: {
                                    'i-modal': IModal
                                },
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        }
                    );

                    const button = await wrapper.getByRole('button');
                    await fireEvent.click(button);

                    const modal = await wrapper.getByRole('dialog');
                    expect(modal).toBeVisible();
                });
            });
        });
    });
});

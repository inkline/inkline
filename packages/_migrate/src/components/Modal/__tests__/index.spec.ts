import { fireEvent, render } from '@testing-library/vue';
import { Modal } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Modal', () => {
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
            expect(Modal.name).toEqual('Modal');
        });

        it('should render correctly', () => {
            const wrapper = render(Modal, {
                props: {
                    modelValue: true,
                    ...props
                },
                slots,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(Modal, {
                        props: {
                            modelValue: true,
                            color: props.color,
                            size: props.size
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
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
                it('should add classes based on props', () => {
                    const wrapper = render(Modal, {
                        props: {
                            modelValue: true,
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        }
                    });
                    const modalWrapper = wrapper.getByRole('dialog');
                    const modal = modalWrapper.querySelector('.modal');

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
                                    'i-modal': Modal
                                },
                                provide: {
                                    ...createTestingInklineOptionsProvide()
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

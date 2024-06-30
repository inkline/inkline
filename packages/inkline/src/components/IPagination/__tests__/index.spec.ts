import { fireEvent, render } from '@testing-library/vue';
import { IPagination } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IPagination', () => {
        const props = {
            color: 'light',
            size: 'md',
            itemsTotal: 100,
            modelValue: 1
        };

        it('should be named correctly', () => {
            expect(IPagination.name).toEqual('IPagination');
        });

        it('should render correctly', () => {
            const wrapper = render(IPagination, {
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
                it('should add classes based on props', async () => {
                    const wrapper = render(IPagination, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });

            describe('pageCount', () => {
                it('should be equal to itemsTotal / itemsPerPage', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const lastPage = await wrapper.getByText('10');

                    expect(lastPage).toBeDefined();
                });
            });

            describe('showQuickPrevious', () => {
                it('should be visible if many pages and current page is after page limit', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 90
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const quickPrevious = wrapper.container.querySelector(
                        '.pagination-item.-quick-previous'
                    );

                    expect(quickPrevious).toBeDefined();
                });
            });

            describe('showQuickNext', () => {
                it('should be visible if many pages and current page is after page limit', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 10
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const quickNext = wrapper.container.querySelector(
                        '.pagination-item.-quick-next'
                    );

                    expect(quickNext).toBeDefined();
                });
            });
        });

        describe('methods', () => {
            describe('next()', () => {
                it('should go to next page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 1
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const button = wrapper.container.querySelector('.pagination-item.-next');

                    await fireEvent.click(button as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([2]);
                });
            });

            describe('quickNext()', () => {
                it('should jump to (currentPage + pageLimit) page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            quickLink: true,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 1
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const button = wrapper.container.querySelector('.pagination-item.-quick-next');

                    await fireEvent.click(button as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([4]);
                });
            });

            describe('previous()', () => {
                it('should go to previous page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 10
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const button = wrapper.container.querySelector('.pagination-item.-previous');

                    await fireEvent.click(button as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([9]);
                });
            });

            describe('quickPrevious()', () => {
                it('should jump to (currentPage - pageLimit) page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            quickLink: true,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 10
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const button = wrapper.container.querySelector(
                        '.pagination-item.-quick-previous'
                    );

                    await fireEvent.click(button as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([7]);
                });
            });

            describe('onClick()', () => {
                it('should go to clicked page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 100,
                            itemsPerPage: 10,
                            modelValue: 2
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const button = wrapper.container.querySelector('.pagination-item.-first');

                    await fireEvent.click(button as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([1]);
                });
            });

            describe('onWindowResize()', () => {
                it('should go to clicked page', async () => {
                    const wrapper = render(IPagination, {
                        props: {
                            ...props,
                            itemsTotal: 200,
                            itemsPerPage: 10,
                            modelValue: 10,
                            limit: {
                                xs: 5,
                                md: 9
                            }
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    (window as any).innerWidth = 1920;
                    await fireEvent(window, new Event('resize'));

                    const items = wrapper.container.querySelectorAll('.pagination-item');
                    expect(items).toHaveLength(13);
                });
            });
        });
    });
});

import { fireEvent, render } from '@testing-library/vue';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';
import {
    Button,
    Dropdown,
    DropdownDivider,
    DropdownItem,
    NavbarKey,
    SidebarKey,
    keymap
} from '@inkline/inkline';

describe('Components', () => {
    describe('Dropdown', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const stubs = {
            Button,
            DropdownItem,
            DropdownDivider
        };

        const slots = {
            default: ['<Button color="light" size="md" />'],
            body: [
                '<DropdownItem />',
                '<DropdownItem />',
                '<DropdownDivider />',
                '<DropdownItem />'
            ]
        };

        it('should be named correctly', () => {
            expect(Dropdown.name).toEqual('Dropdown');
        });

        it('should render correctly', () => {
            const wrapper = render(Dropdown, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(Dropdown, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            visible: true,
                            ...props
                        },
                        slots
                    });
                    const menu = await wrapper.getByRole('menu');

                    expect(menu).toHaveClass(`-${props.color}`, `-${props.size}`);
                });
            });
        });

        describe('methods', () => {
            describe('onEscape()', () => {
                it('should close the dropdown if open', async () => {
                    const wrapper = render(Dropdown, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            visible: true,
                            ...props
                        },
                        slots
                    });
                    const menu = await wrapper.getByRole('menu');
                    await fireEvent.keyUp(wrapper.container.firstChild as Element, {
                        key: keymap.esc[0]
                    });
                    expect(wrapper.emitted()['update:visible'][0]).toEqual([false]);
                    expect(menu).not.toBeVisible();
                });
            });

            describe('handleClickOutside()', () => {
                it('should close the dropdown if open', async () => {
                    const wrapper = render(Dropdown, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props,
                        slots
                    });
                    const trigger = await wrapper.getByRole('button');
                    await fireEvent.click(trigger);
                    const menu = await wrapper.getByRole('menu');
                    expect(menu).toBeVisible();
                    await fireEvent.mouseUp(wrapper.baseElement);
                });
            });

            describe('onTriggerKeyDown()', () => {
                it('should not do anything if triggerKeyBindings is empty', async () => {
                    const wrapper = render(Dropdown, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            triggerKeyBindings: [],
                            ...props
                        },
                        slots
                    });
                    const trigger = await wrapper.getByRole('button');
                    const menu = wrapper.container.querySelector('[role="menu"]');
                    await fireEvent.keyDown(trigger, { key: keymap.up[1] });
                    expect(menu).not.toBeVisible();
                });

                ['up', 'down'].forEach((key) => {
                    describe(key, () => {
                        it('should open the dropdown', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props,
                                slots
                            });
                            const trigger = await wrapper.getByRole('button');
                            await fireEvent.keyDown(trigger, { key: keymap[key][1] });
                            const menu = await wrapper.getByRole('menu');
                            expect(menu).toBeVisible();
                        });
                    });
                });

                ['enter', 'space'].forEach((key) => {
                    describe(key, () => {
                        it('should open the dropdown', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props,
                                slots
                            });
                            const trigger = await wrapper.getByRole('button');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            const menu = await wrapper.getByRole('menu');
                            expect(menu).toBeVisible();
                        });

                        it('should close the dropdown if open', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props,
                                slots
                            });
                            const trigger = await wrapper.getByRole('button');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            const menu = await wrapper.getByRole('menu');
                            expect(menu).toBeVisible();
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });

                ['tab', 'esc'].forEach((key) => {
                    describe(key, () => {
                        it('should close the dropdown', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props,
                                slots
                            });
                            const trigger = await wrapper.getByRole('button');
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('menu');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });

            describe('onItemKeyDown()', () => {
                it('should not do anything if itemKeyBindings is empty', async () => {
                    const wrapper = render(Dropdown, {
                        global: {
                            stubs,
                            provide: {
                                ...createTestingInklineOptionsProvide()
                            }
                        },
                        props: {
                            visible: true,
                            itemKeyBindings: [],
                            ...props
                        },
                        slots
                    });
                    const menuItems = await wrapper.getAllByRole('menuitem');
                    await fireEvent.keyDown(menuItems[0], { key: keymap.up[1] });
                    expect(menuItems[0]).not.toHaveFocus();
                });

                describe('up', () => {
                    it('should focus previous item', async () => {
                        const wrapper = render(Dropdown, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            },
                            props: {
                                visible: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        menuItems[1].focus();
                        await fireEvent.keyDown(menuItems[1], { key: keymap.up[0] });
                        expect(menuItems[0]).toHaveFocus();
                    });

                    it('should remain focused if first item', async () => {
                        const wrapper = render(Dropdown, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            },
                            props: {
                                visible: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        menuItems[0].focus();
                        await fireEvent.keyDown(menuItems[0], { key: keymap.up[0] });
                        expect(menuItems[0]).toHaveFocus();
                    });
                });

                describe('down', () => {
                    it('should focus next item', async () => {
                        const wrapper = render(Dropdown, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            },
                            props: {
                                visible: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        menuItems[0].focus();
                        await fireEvent.keyDown(menuItems[0], { key: keymap.down[0] });
                        expect(menuItems[1]).toHaveFocus();
                    });

                    it('should remain focused if last item', async () => {
                        const wrapper = render(Dropdown, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide()
                                }
                            },
                            props: {
                                visible: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        menuItems[1].focus();
                        await fireEvent.keyDown(menuItems[menuItems.length - 1], {
                            key: keymap.down[0]
                        });
                        expect(menuItems[menuItems.length - 1]).toHaveFocus();
                    });
                });

                ['enter', 'space'].forEach((key) => {
                    describe(key, () => {
                        it('should click item and focus trigger', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props: {
                                    hideOnItemClick: false,
                                    visible: true,
                                    ...props
                                },
                                slots
                            });
                            const menuItems = await wrapper.getAllByRole('menuitem');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menuItems[0]).not.toHaveFocus();
                        });

                        it('should close dropdown if hideOnItemClick', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props: {
                                    hideOnItemClick: true,
                                    visible: true,
                                    ...props
                                },
                                slots
                            });
                            const menu = await wrapper.getByRole('menu');
                            const menuItems = await wrapper.getAllByRole('menuitem');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });

                ['tab', 'esc'].forEach((key) => {
                    describe(key, () => {
                        it('should close dropdown if hideOnItemClick', async () => {
                            const wrapper = render(Dropdown, {
                                global: {
                                    stubs,
                                    provide: {
                                        ...createTestingInklineOptionsProvide()
                                    }
                                },
                                props: {
                                    hideOnItemClick: true,
                                    visible: true,
                                    ...props
                                },
                                slots
                            });
                            const menu = await wrapper.getByRole('menu');
                            const menuItems = await wrapper.getAllByRole('menuitem');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });

            describe('onItemClick()', () => {
                [NavbarKey, SidebarKey].forEach((parent) => {
                    it(`should call parent ${parent.toString()} onItemClick`, async () => {
                        const onItemClick = vi.fn();
                        const wrapper = render(Dropdown, {
                            global: {
                                stubs,
                                provide: {
                                    ...createTestingInklineOptionsProvide(),
                                    [parent as symbol]: {
                                        onItemClick
                                    }
                                }
                            },
                            props: {
                                hideOnItemClick: true,
                                visible: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        await fireEvent.click(menuItems[0]);

                        expect(onItemClick).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});

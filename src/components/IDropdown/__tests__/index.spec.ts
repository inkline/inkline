import {fireEvent, render, waitFor} from '@testing-library/vue';
import {IButton, IDropdown, IDropdownDivider, IDropdownItem} from '@inkline/inkline/components';
import {keymap} from "@inkline/inkline/constants";

describe('Components', () => {
    describe('IDropdown', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const stubs = {
            'i-button': IButton,
            'i-dropdown-item': IDropdownItem,
            'i-dropdown-divider': IDropdownDivider
        };

        const slots = {
            default: [
                '<i-button color="light" size="md" />'
            ],
            body: [
                '<i-dropdown-item />',
                '<i-dropdown-item />',
                '<i-dropdown-divider />',
                '<i-dropdown-item />'
            ]
        };

        it('should be named correctly', () => {
            expect(IDropdown.name).toEqual('IDropdown');
        });

        it('should render correctly', () => {
            const wrapper = render(IDropdown, {
                global: { stubs },
                props,
                slots
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(IDropdown, {
                        global: { stubs },
                        props: {
                            modelValue: true,
                            ...props
                        },
                        slots
                    });
                    const menu = await wrapper.getByRole('menu');

                    expect(menu).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });

        describe('methods', () => {
            describe('onEscape()', () => {
                it('should close the dropdown if open', async () => {
                    const wrapper = render(IDropdown, {
                        global: { stubs },
                        props: {
                            modelValue: true,
                            ...props
                        },
                        slots
                    });
                    const menu = await wrapper.getByRole('menu');
                    await fireEvent.keyUp(wrapper.container.firstChild as Element, { key: keymap.esc[0] });
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                    expect(menu).not.toBeVisible();
                });
            });

            describe('handleClickOutside()', () => {
                it('should close the dropdown if open', async () => {
                    const wrapper = render(IDropdown, {
                        global: { stubs },
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
                it('should not do anything if keydownTrigger is empty', async () => {
                    const wrapper = render(IDropdown, {
                        global: { stubs },
                        props: {
                            keydownTrigger: [],
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
                            const wrapper = render(IDropdown, {
                                global: { stubs },
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
                            const wrapper = render(IDropdown, {
                                global: { stubs },
                                props,
                                slots
                            });
                            const trigger = await wrapper.getByRole('button');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            const menu = await wrapper.getByRole('menu');
                            expect(menu).toBeVisible();
                        });

                        it('should close the dropdown if open', async () => {
                            const wrapper = render(IDropdown, {
                                global: { stubs },
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
                            const wrapper = render(IDropdown, {
                                global: { stubs },
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
                it('should not do anything if keydownItem is empty', async () => {
                    const wrapper = render(IDropdown, {
                        global: { stubs },
                        props: {
                            modelValue: true,
                            keydownItem: [],
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
                        const wrapper = render(IDropdown, {
                            global: { stubs },
                            props: {
                                modelValue: true,
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
                        const wrapper = render(IDropdown, {
                            global: { stubs },
                            props: {
                                modelValue: true,
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
                        const wrapper = render(IDropdown, {
                            global: { stubs },
                            props: {
                                modelValue: true,
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
                        const wrapper = render(IDropdown, {
                            global: { stubs },
                            props: {
                                modelValue: true,
                                ...props
                            },
                            slots
                        });
                        const menuItems = await wrapper.getAllByRole('menuitem');
                        menuItems[1].focus();
                        await fireEvent.keyDown(menuItems[menuItems.length - 1], { key: keymap.down[0] });
                        expect(menuItems[menuItems.length - 1]).toHaveFocus();
                    });
                });

                ['enter', 'space'].forEach((key) => {
                    describe(key, () => {
                        it('should click item and focus trigger', async () => {
                            const wrapper = render(IDropdown, {
                                global: { stubs },
                                props: {
                                    hideOnItemClick: false,
                                    modelValue: true,
                                    ...props
                                },
                                slots
                            });
                            const menuItems = await wrapper.getAllByRole('menuitem');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menuItems[0]).not.toHaveFocus();
                        });

                        it('should close dropdown if hideOnItemClick', async () => {
                            const wrapper = render(IDropdown, {
                                global: { stubs },
                                props: {
                                    hideOnItemClick: true,
                                    modelValue: true,
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
                            const wrapper = render(IDropdown, {
                                global: { stubs },
                                props: {
                                    hideOnItemClick: true,
                                    modelValue: true,
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
        });
    });
});

import { fireEvent, render } from '@testing-library/vue';
import {IDropdown, ISelect} from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';
import { keymap } from '@inkline/inkline/constants';

describe('Components', () => {
    describe('ISelect', () => {
        const options = [
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
        ];

        const props = {
            name: 'select',
            color: 'primary',
            size: 'md',
            options,
            modelValue: options[0]
        };

        it('should be named correctly', () => {
            expect(ISelect.name).toEqual('ISelect');
        });

        it('should render correctly', () => {
            const wrapper = render(ISelect, {
                props,
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('name', () => {
                it('should have randomly generated name uid', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            color: props.color,
                            size: props.size,
                            options: props.options,
                            modelValue: props.modelValue
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('id', expect.stringContaining('select'));
                });
            });
        });

        describe('computed', () => {
            describe('wrapperClasses', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ISelect, {
                        props,
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                    );
                });
            });

            describe('popupClasses', () => {
                it('should add classes based on props', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            disabled: true,
                            readonly: true
                        },
                    });
                    const popup = wrapper.container.querySelector('[role="listbox"]');

                    expect(popup).toHaveClass(
                        '-disabled',
                        '-readonly',
                    );
                });
            });

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ISelect, {
                        props: {
                            disabled: true,
                            ...props
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    expect(input).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ISelect, { props });
                    const input = wrapper.container.querySelector('input');

                    expect(input).toHaveAttribute('tabindex', '1');
                });
            });

            describe('isClearable', () => {
                it('should be clearable if value and clearable', () => {
                    const wrapper = render(ISelect, {
                        props: {
                            clearable: true,
                            ...props
                        }
                    });
                    const clear = wrapper.container.querySelector('.input-clear');

                    expect(clear).toBeVisible();
                });
            });

            describe('value', () => {
                it('should be schema.value if parent schema', () => {
                    const wrapper = createMockInstance(ISelect, { props });

                    wrapper.schema = {
                        value: options[1]
                    };

                    expect(wrapper.value).toEqual(options[1]);
                });

                it('should be modelValue otherwise', () => {
                    const wrapper = createMockInstance(ISelect, { props });

                    expect(wrapper.value).toEqual(props.modelValue);
                });
            });

            describe('inputPlaceholder', () => {
                it('should be default placeholder if no value', () => {
                    const placeholder = 'Placeholder';
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            modelValue: null,
                            placeholder,
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    expect(input).toHaveAttribute('placeholder', placeholder);
                });
            });
        });

        describe('methods', () => {
            describe('onInput()', () => {
                it('should hide the menu, and update value', async () => {
                    const wrapper = render(ISelect, {
                        props
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);
                    const menu = await wrapper.getByRole('listbox');
                    const optionElements = await wrapper.getAllByRole('option');
                    await fireEvent.click(optionElements[1]);

                    expect(menu).not.toBeVisible();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([options[1]]);
                });
            });

            describe('onClear()', () => {
                it('should clear input value', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            clearable: true
                        }
                    });
                    const clear = wrapper.container.querySelector('.input-clear');

                    await fireEvent.click(clear as Element);

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([null]);
                });
            });

            describe('onFocus()', () => {
                it('should not open select if there are no options', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            options: []
                        }
                    });
                    const input = wrapper.container.querySelector('input');
                    const menu = wrapper.container.querySelector('[role="listbox"]');

                    await fireEvent.focus(input as Element);

                    expect(menu).not.toBeVisible();
                });

                it('should open select', async () => {
                    const wrapper = render(ISelect, {
                        props
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.focus(input as Element);
                    const menu = await wrapper.getByRole('listbox');

                    expect(menu).toBeVisible();
                });

                it('should clear input value if autocomplete', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            autocomplete: true
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.focus(input as Element);

                    expect(input).toHaveValue('');
                });

                it('should open menu if input minLength is 0', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            autocomplete: true,
                            minLength: 0
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.focus(input as Element);
                    const menu = await wrapper.getByRole('listbox');

                    expect(menu).toBeVisible();
                });
            });

            describe('onBlur()', () => {
                it('should hide menu, set input value and call parent.onblur', async () => {
                    const onBlur = jest.fn();
                    const wrapper = render(ISelect, {
                        global: {
                            provide: {
                                form: {
                                    onBlur
                                }
                            }
                        },
                        props
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.focus(input as Element);
                    const menu = await wrapper.getByRole('listbox');
                    await fireEvent.blur(input as Element);

                    expect(menu).not.toBeVisible();
                    expect(input).toHaveValue(options[0].label);
                    expect(onBlur).toHaveBeenCalled();
                });
            });

            describe('onClick()', () => {
                it('should show menu', async () => {
                    const wrapper = render(ISelect, {
                        props
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);
                    const menu = await wrapper.getByRole('listbox');

                    expect(menu).toBeVisible();
                });

                it('should clear input value if autocomplete', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            autocomplete: true
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);

                    expect(input).toHaveValue('');
                });
            });

            describe('onClickOutside()', () => {
                it('should hide the menu', async () => {
                    const wrapper = createMockInstance(ISelect, { props });

                    wrapper.hide = jest.fn();
                    wrapper.onClickOutside();

                    expect(wrapper.hide).toHaveBeenCalled();
                });
            });

            describe('onCaretClick()', () => {
                it('should focus the input', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            autocomplete: true
                        }
                    });
                    const caret = wrapper.container.querySelector('.select-caret');
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(caret as Element);

                    expect(input).toHaveFocus();
                });
            });

            describe('onTriggerKeyDown()', () => {
                it('should not do anything if keydownTrigger is empty', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            keydownTrigger: [],
                            ...props
                        }
                    });
                    const trigger = await wrapper.getByRole('input');
                    const menu = wrapper.container.querySelector('[role="listbox"]');
                    await fireEvent.keyDown(trigger, { key: keymap.up[1] });
                    expect(menu).not.toBeVisible();
                });

                ['up', 'down'].forEach((key) => {
                    describe(key, () => {
                        it('should open the dropdown', async () => {
                            const wrapper = render(ISelect, {
                                props,
                            });
                            const trigger = await wrapper.getByRole('input');
                            await fireEvent.keyDown(trigger, { key: keymap[key][1] });
                            const menu = await wrapper.getByRole('listbox');
                            expect(menu).toBeVisible();
                        });
                    });
                });

                describe('enter', () => {
                    it('should open the dropdown', async () => {
                        const wrapper = render(ISelect, {
                            props,
                        });
                        const trigger = await wrapper.getByRole('input');
                        await fireEvent.keyDown(trigger, { key: keymap['enter'][0] });
                        const menu = await wrapper.getByRole('listbox');
                        expect(menu).toBeVisible();
                    });
                });

                ['tab', 'esc'].forEach((key) => {
                    describe(key, () => {
                        it('should close the dropdown', async () => {
                            const wrapper = render(ISelect, {
                                props,
                            });
                            const trigger = await wrapper.getByRole('input');
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('listbox');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });

            describe('onItemKeyDown()', () => {
                it('should not do anything if keydownItem is empty', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            keydownItem: [],
                            ...props
                        },
                    });
                    const trigger = await wrapper.getByRole('input');
                    await fireEvent.click(trigger);
                    const menuItems = await wrapper.getAllByRole('option');
                    await fireEvent.keyDown(menuItems[0], { key: keymap.up[1] });
                    expect(menuItems[0]).not.toHaveFocus();
                });

                describe('up', () => {
                    it('should focus previous item', async () => {
                        const wrapper = render(ISelect, {
                            props: {
                                ...props
                            },
                        });
                        const trigger = await wrapper.getByRole('input');
                        await fireEvent.click(trigger);
                        const menuItems = await wrapper.getAllByRole('option');
                        menuItems[1].focus();
                        await fireEvent.keyDown(menuItems[1], { key: keymap.up[0] });
                        expect(menuItems[0]).toHaveFocus();
                    });

                    it('should remain focused if first item', async () => {
                        const wrapper = render(ISelect, {
                            props: {
                                ...props
                            },
                        });
                        const trigger = await wrapper.getByRole('input');
                        await fireEvent.click(trigger);
                        const menuItems = await wrapper.getAllByRole('option');
                        menuItems[0].focus();
                        await fireEvent.keyDown(menuItems[0], { key: keymap.up[0] });
                        expect(menuItems[0]).toHaveFocus();
                    });
                });

                describe('down', () => {
                    it('should focus next item', async () => {
                        const wrapper = render(ISelect, {
                            props: {
                                ...props
                            },
                        });
                        const trigger = await wrapper.getByRole('input');
                        await fireEvent.click(trigger);
                        const menuItems = await wrapper.getAllByRole('option');
                        menuItems[0].focus();
                        await fireEvent.keyDown(menuItems[0], { key: keymap.down[0] });
                        expect(menuItems[1]).toHaveFocus();
                    });

                    it('should remain focused if last item', async () => {
                        const wrapper = render(ISelect, {
                            props: {
                                ...props
                            },
                        });
                        const trigger = await wrapper.getByRole('input');
                        await fireEvent.click(trigger);
                        const menuItems = await wrapper.getAllByRole('option');
                        menuItems[1].focus();
                        await fireEvent.keyDown(menuItems[menuItems.length - 1], { key: keymap.down[0] });
                        expect(menuItems[menuItems.length - 1]).toHaveFocus();
                    });
                });

                ['enter', 'space'].forEach((key) => {
                    describe(key, () => {
                        it('should click item and focus trigger', async () => {
                            const wrapper = render(ISelect, {
                                props: {
                                    hideOnItemClick: false,
                                    ...props
                                },
                            });
                            const trigger = await wrapper.getByRole('input');
                            await fireEvent.click(trigger);
                            const menuItems = await wrapper.getAllByRole('option');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menuItems[0]).not.toHaveFocus();
                        });

                        it('should close dropdown if hideOnItemClick', async () => {
                            const wrapper = render(ISelect, {
                                props: {
                                    hideOnItemClick: true,
                                    ...props
                                },
                            });
                            const trigger = await wrapper.getByRole('input');
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('listbox');
                            const menuItems = await wrapper.getAllByRole('option');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });

                ['tab', 'esc'].forEach((key) => {
                    describe(key, () => {
                        it('should close dropdown if hideOnItemClick', async () => {
                            const wrapper = render(ISelect, {
                                props: {
                                    hideOnItemClick: true,
                                    ...props
                                },
                            });
                            const trigger = await wrapper.getByRole('input');
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('listbox');
                            const menuItems = await wrapper.getAllByRole('option');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });

            describe('getFocusableItems()', () => {
                it('should return focusable children', async () => {
                    const children = [
                        { tabIndex: 1 },
                        { tabIndex: 2 },
                        { tabIndex: 3 }
                    ];
                    const wrapper = createMockInstance(ISelect, {
                        props,
                        methods: {
                            hide: jest.fn()
                        },
                        mocks: {
                            $refs: {
                                options: {
                                    children
                                }
                            }
                        }
                    });

                    const result = wrapper.getFocusableItems();
                    expect(result).toEqual(children);
                });
            });

            describe('getElementHeight()', () => {
                it('should return computed style height', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props,
                    });
                    const element = document.createElement('div');

                    element.style.height = '400px';

                    const result = wrapper.getElementHeight(element);
                    expect(result).toEqual(400);
                });

                it('should return NaN if height unavailable', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props,
                    });
                    const element = document.createElement('div');

                    const result = wrapper.getElementHeight(element);
                    expect(result).toEqual(NaN);
                });
            });

            describe('inputMatchesLabel()', () => {
                it('should return true if given value equals selected value label', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props,
                    });

                    expect(wrapper.inputMatchesLabel(options[0].label)).toEqual(true);
                });

                it('should return undefined if given value does not equal selected value label', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props,
                    });

                    expect(wrapper.inputMatchesLabel('Other')).toEqual(false);
                });

                it('should return undefined if no selected value', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            modelValue: null
                        },
                    });

                    expect(wrapper.inputMatchesLabel(options[0].label)).toEqual(null);
                });
            });

            describe('inputMatchesLength()', () => {
                it('should return true if minLength is 0', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 0
                        },
                    });

                    expect(wrapper.inputMatchesLength('')).toEqual(true);
                });

                it('should return true if value length greater than or equal to minLength', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 3
                        },
                    });

                    expect(wrapper.inputMatchesLength('abc')).toEqual(true);
                });

                it('should return false if value length less than minLength', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 3
                        },
                    });

                    expect(wrapper.inputMatchesLength('ab')).toEqual(false);
                });
            });

            describe('inputShouldShowSelect()', () => {
                it('should return true if not autocomplete', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            autocomplete: false
                        },
                    });

                    expect(wrapper.inputShouldShowSelect('')).toEqual(true);
                });

                it('should return true if autocomplete, matches min length and doesn\'t match label', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 3,
                            autocomplete: true
                        },
                    });

                    expect(wrapper.inputShouldShowSelect('abc')).toEqual(true);
                });

                it('should return false if autocomplete and matches label', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 3,
                            autocomplete: true
                        },
                    });

                    expect(wrapper.inputShouldShowSelect(options[0].label)).toEqual(false);
                });

                it('should return false if autocomplete and doesn\'t match min length', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            minLength: 3,
                            autocomplete: true
                        },
                    });

                    expect(wrapper.inputShouldShowSelect('ab')).toEqual(false);
                });
            });

            describe('computeLabel()', () => {
                it('should return inputValue if option not an object', async () => {
                    const wrapper = createMockInstance(ISelect, {
                        props,
                    });

                    expect(wrapper.computeLabel('abc')).toEqual(wrapper.inputValue);
                });

                it('should evaluate label function if function provided', async () => {
                    const option = { name: 'abc' };
                    const wrapper = createMockInstance(ISelect, {
                        props: {
                            ...props,
                            label: (o: any) => o.name
                        },
                    });

                    expect(wrapper.computeLabel(option)).toEqual(option.name);
                });
            });
        });
    });
});

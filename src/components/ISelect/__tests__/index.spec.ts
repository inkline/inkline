import { fireEvent, render, waitFor } from '@testing-library/vue';
import { ISelect } from '@inkline/inkline/components';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';
import { keymap } from '@inkline/inkline/constants';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';
import { ref } from 'vue';
import { FormKey } from '@inkline/inkline/components/IForm';

describe('Components', () => {
    describe('ISelect', () => {
        const options = [
            { id: 0, label: 'Option 1', value: 1 },
            { id: 1, label: 'Option 2', value: 2 },
            { id: 2, label: 'Option 3', value: 3 }
        ];

        const props = {
            name: 'select',
            color: 'primary',
            size: 'md',
            options,
            modelValue: options[0].id
        };

        it('should be named correctly', () => {
            expect(ISelect.name).toEqual('ISelect');
        });

        it('should render correctly', () => {
            const wrapper = render(ISelect, {
                props,
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
                    const wrapper = render(ISelect, {
                        props: {
                            color: props.color,
                            size: props.size,
                            options: props.options,
                            modelValue: props.modelValue
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute(
                        'id',
                        expect.stringContaining('select')
                    );
                });
            });

            describe('options', () => {
                it('should render correctly without options', () => {
                    const wrapper = render(ISelect, {
                        props: {
                            name: 'select',
                            color: 'primary',
                            size: 'md'
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.html()).toMatchSnapshot();
                });
            });
        });

        describe('computed', () => {
            describe('wrapperClasses', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(ISelect, {
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

            describe('tabIndex', () => {
                it('should be -1 if disabled', () => {
                    const wrapper = render(ISelect, {
                        props: {
                            disabled: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    expect(input).toHaveAttribute('tabindex', '-1');
                });

                it('should be 1 otherwise', () => {
                    const wrapper = render(ISelect, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    expect(input).toHaveAttribute('tabindex', '0');
                });
            });

            describe('isClearable', () => {
                it('should be clearable if value and clearable', () => {
                    const wrapper = render(ISelect, {
                        props: {
                            clearable: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const clear = wrapper.container.querySelector('.input-clear');

                    expect(clear).toBeVisible();
                });
            });

            describe('inputPlaceholder', () => {
                it('should be default placeholder if no value', () => {
                    const placeholder = 'Placeholder';
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            modelValue: null,
                            placeholder
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);
                    const menu = await wrapper.getByRole('listbox');
                    const optionElements = await wrapper.getAllByRole('option');
                    await fireEvent.click(optionElements[1]);

                    expect(menu).not.toBeVisible();
                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([options[1].id]);
                });

                it('should call parent form onInput', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ISelect, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onBlur,
                                    onInput
                                }
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);
                    const optionElements = await wrapper.getAllByRole('option');
                    await fireEvent.click(optionElements[1]);

                    expect(onInput).toHaveBeenCalled();
                });
            });

            describe('onClear()', () => {
                it('should clear input value', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            ...props,
                            clearable: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
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
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');
                    const menu = wrapper.container.querySelector('[role="listbox"]');

                    await fireEvent.focus(input as Element);

                    expect(menu).not.toBeVisible();
                });

                it('should open select', async () => {
                    const wrapper = render(ISelect, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input');

                    await fireEvent.click(input as Element);
                    const menu = await wrapper.getByRole('listbox');

                    expect(menu).toBeVisible();
                });
            });

            describe('onBlur()', () => {
                it('should hide menu, set input value and call parent.onblur', async () => {
                    const onBlur = vi.fn();
                    const onInput = vi.fn();
                    const wrapper = render(ISelect, {
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline(),
                                [FormKey as symbol]: {
                                    disabled: ref(false),
                                    readonly: ref(false),
                                    onBlur,
                                    onInput
                                }
                            }
                        },
                        props
                    });
                    const input = wrapper.container.querySelector('input') as Element;

                    await fireEvent.blur(input);

                    expect(onBlur).toHaveBeenCalled();
                });
            });

            describe('onClick()', () => {
                it('should show menu', async () => {
                    const wrapper = render(ISelect, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const input = wrapper.container.querySelector('input') as Element;

                    await fireEvent.click(input);
                    const menu = await wrapper.getByRole('listbox');

                    expect(menu).toBeVisible();
                });
            });

            describe('onCaretClick()', () => {
                it('should open the input', async () => {
                    const wrapper = render(ISelect, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const caret = wrapper.container.querySelector('.select-caret');

                    await fireEvent.click(caret as Element);

                    const dropdown = await wrapper.getByRole('listbox');
                    expect(dropdown).toBeVisible();
                });
            });

            describe('onTriggerKeyDown()', () => {
                it('should not do anything if triggerKeyBindings is empty', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            triggerKeyBindings: [],
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const trigger: HTMLElement = wrapper.container.querySelector('input')!;
                    const menu = wrapper.container.querySelector('[role="listbox"]');
                    await fireEvent.keyDown(trigger, { key: keymap.up[1] });
                    expect(menu).not.toBeVisible();
                });

                ['up', 'down'].forEach((key) => {
                    describe(key, () => {
                        it('should open the dropdown', async () => {
                            const wrapper = render(ISelect, {
                                props,
                                global: {
                                    provide: {
                                        [InklineKey as symbol]: createInkline()
                                    }
                                }
                            });
                            const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });
                        const trigger: HTMLElement = wrapper.container.querySelector('input')!;
                        await fireEvent.keyDown(trigger, { key: keymap.enter[0] });
                        const menu = await wrapper.getByRole('listbox');
                        expect(menu).toBeVisible();
                    });
                });

                ['tab', 'esc'].forEach((key) => {
                    describe(key, () => {
                        it('should close the dropdown', async () => {
                            const wrapper = render(ISelect, {
                                props,
                                global: {
                                    provide: {
                                        [InklineKey as symbol]: createInkline()
                                    }
                                }
                            });
                            const trigger: HTMLElement = wrapper.container.querySelector('input')!;
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('listbox');
                            await fireEvent.keyDown(trigger, { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });

            describe('onItemKeyDown()', () => {
                it('should not do anything if itemKeyBindings is empty', async () => {
                    const wrapper = render(ISelect, {
                        props: {
                            itemKeyBindings: [],
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });
                    const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });
                        const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });
                        const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });
                        const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                            global: {
                                provide: {
                                    [InklineKey as symbol]: createInkline()
                                }
                            }
                        });
                        const trigger: HTMLElement = wrapper.container.querySelector('input')!;
                        await fireEvent.click(trigger);
                        const menuItems = await wrapper.getAllByRole('option');
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
                            const wrapper = render(ISelect, {
                                props: {
                                    hideOnItemClick: false,
                                    ...props
                                },
                                global: {
                                    provide: {
                                        [InklineKey as symbol]: createInkline()
                                    }
                                }
                            });
                            const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                                global: {
                                    provide: {
                                        [InklineKey as symbol]: createInkline()
                                    }
                                }
                            });
                            const trigger: HTMLElement = wrapper.container.querySelector('input')!;
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
                                global: {
                                    provide: {
                                        [InklineKey as symbol]: createInkline()
                                    }
                                }
                            });
                            const trigger: HTMLElement = wrapper.container.querySelector('input')!;
                            await fireEvent.click(trigger);
                            const menu = await wrapper.getByRole('listbox');
                            const menuItems = await wrapper.getAllByRole('option');
                            await fireEvent.keyDown(menuItems[0], { key: keymap[key][0] });
                            expect(menu).not.toBeVisible();
                        });
                    });
                });
            });
        });
    });
});

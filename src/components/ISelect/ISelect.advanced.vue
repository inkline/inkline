<script lang="ts" setup>
/* eslint-disable */
import { computed, inject, nextTick, PropType, provide, ref, useAttrs, useSlots, watch } from 'vue';
import { isFocusable, isFunction, isKey, uid, getValueByPath } from '@grozav/utils';

import { FormKey } from '@inkline/inkline/components/IForm';
import { FormGroupKey } from '@inkline/inkline/components/IFormGroup';
import {
    useClickOutside,
    useComponentColor,
    useComponentSize,
    useFormValidationError,
    useValidation
} from '@inkline/inkline/composables';
import { PopupEvent, usePopupControl } from '@inkline/inkline/composables/popup';
import { Placement } from '@floating-ui/dom';
import { SelectKey, SelectOption } from '@inkline/inkline/components/ISelect/mixin';

const componentName = 'ISelect';

const props = defineProps({
    /**
     * The duration of the hide and show animation
     * @type Number
     * @default 300
     * @name animationDuration
     */
    animationDuration: {
        type: Number,
        default: 300
    },
    /**
     * Enable autocomplete functionality
     * @type Boolean
     * @default false
     * @name autocomplete
     */
    autocomplete: {
        type: Boolean,
        default: false
    },
    /**
     * Displays an arrow on the dropdown pointing to the trigger element
     * @type Boolean
     * @default true
     * @name arrow
     */
    arrow: {
        type: Boolean,
        default: true
    },
    /**
     * The color variant of the select
     * @type light | dark
     * @default
     * @name color
     */
    color: {
        type: String,
        default: undefined
    },
    /**
     * Display the select as clearable
     * @type Boolean
     * @default false
     * @name clearable
     */
    clearable: {
        type: Boolean,
        default: false
    },
    /**
     * The disabled state of the select
     * @type Boolean
     * @default false
     * @name disabled
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * The error state of the checkbox, computed based on schema by default.
     * @type Boolean | Array
     * @default ['touched', 'dirty', 'invalid']
     * @TODO use propDefaultValue to set default value
     * @name error
     */
    error: {
        type: [Array, Boolean] as PropType<boolean | string[]>,
        default: () => ['touched', 'dirty', 'invalid']
    },
    /**
     * The events used to trigger the dropdown
     * @type hover | focus | click | manual
     * @default [click]
     * @name trigger
     */
    events: {
        type: [String, Array] as PropType<PopupEvent | PopupEvent[]>,
        default: (): string[] => ['click']
    },
    /**
     * The field to be used for identifying the options
     * @type String
     * @default id
     * @name idField
     */
    idField: {
        type: String,
        default: 'id'
    },
    /**
     * The keydown events bound to the trigger element
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     * @name triggerKeyBindings
     */
    triggerKeyBindings: {
        type: Array,
        default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
    },
    /**
     * The keydown events bound to the select option elements
     * @type string[]
     * @default [up, down, enter, space, tab, esc]
     * @name itemKeyBindings
     */
    itemKeyBindings: {
        type: Array,
        default: (): string[] => ['up', 'down', 'enter', 'space', 'tab', 'esc']
    },
    /**
     * Determines whether hover state should be transferred from trigger to popup
     * @type Boolean
     * @default true
     * @name interactable
     */
    interactable: {
        type: Boolean,
        default: true
    },
    /**
     * Used to extract the label from the select option and select value
     * @type String | Function
     * @default label
     * @name label
     */
    label: {
        type: [String, Function],
        default: 'label'
    },
    /**
     * The loading state of the select
     * @type Boolean
     * @default false
     * @name loading
     */
    loading: {
        type: Boolean,
        default: false
    },
    /**
     * Used to set the field value
     * @type Object | String | Number
     * @default null
     * @name modelValue
     */
    modelValue: {
        type: [Object, String, Number],
        default: null
    },
    /**
     * Used to manually control the visibility of the select dropdown
     * @type Boolean
     * @default false
     * @name visible
     */
    visible: {
        type: Boolean,
        default: false
    },
    /**
     * The minimum input length to open the select dropdown at
     * @type Number
     * @default 0
     * @name minLength
     */
    minLength: {
        type: Number,
        default: 0
    },
    /**
     * The unique identifier of the select
     * @type String
     * @default uid()
     * @name name
     */
    name: {
        type: String,
        default: (): string => uid('select')
    },
    /**
     * The options to be displayed in the select component
     * @type Array
     * @default []
     * @name options
     */
    options: {
        type: Array,
        default: (): SelectOption[] => []
    },
    /**
     * The placeholder of the select input
     * @type String
     * @default ''
     * @name placeholder
     */
    placeholder: {
        type: String,
        default: ''
    },
    /**
     * The offset of the dropdown relative to the trigger element
     * @type Number
     * @default 6
     * @name offset
     */
    offset: {
        type: Number,
        default: 6
    },
    /**
     * The placement of the select dropdown
     * @type top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end
     * @default false
     * @name placement
     */
    placement: {
        type: String as PropType<Placement>,
        default: 'bottom'
    },
    /**
     * Used to override the floating-ui options used for creating the dropdown
     * @type Object
     * @default {}
     * @name popupOptions
     */
    popupOptions: {
        type: Object,
        default: (): any => ({})
    },
    /**
     * The readonly state of the select
     * @type Boolean
     * @default false
     * @name readonly
     */
    readonly: {
        type: Boolean,
        default: false
    },
    /**
     * The number of pixels until scroll end before loading the next page
     * @type Number
     * @default 160
     * @name scrollTolerance
     */
    scrollTolerance: {
        type: Number,
        default: 160
    },
    /**
     * Selects the first option when pressing enter
     * @type Boolean
     * @default true
     * @name selectFirstOptionOnEnter
     */
    selectFirstOptionOnEnter: {
        type: Boolean,
        default: true
    },
    /**
     * The size variant of the select
     * @type sm | md | lg
     * @default
     * @name size
     */
    size: {
        type: String,
        default: ''
    },
    /**
     * The tabindex of the select
     * @type Number | String
     * @default 0
     * @name tabindex
     */
    tabindex: {
        type: [Number, String],
        default: 0
    },
    /**
     * The type of the select
     * @type String
     * @default text
     * @name type
     */
    type: {
        type: String,
        default: 'text'
    },
    /**
     * The total number of options, used for infinite scrolling
     * @type Number
     * @default
     * @name total
     */
    total: {
        type: Number
    },
    /**
     * Delay in milliseconds before the popover is hidden on hover
     * @name hoverHideDelay
     * @type Number
     * @default 300
     */
    hoverHideDelay: {
        type: Number,
        default: 300
    }
});

const attrs = useAttrs();
const slots = useSlots();

const emit = defineEmits([
    /**
     * Event emitted for setting the modelValue
     * @event update:modelValue
     */
    'update:modelValue',
    /**
     * Event emitted for setting the visible
     * @event update:visible
     */
    'update:visible',
    /**
     * Event emitted when input value changes
     * @event search
     */
    'search',
    /**
     * Event emitted when the next page needs to be loaded
     * @event pagination
     */
    'pagination',
    /**
     * Event emitted when clearing the select element
     * @event clear
     */
    'clear'
]);

const form = inject(FormKey, null);
const formGroup = inject(FormGroupKey, null);

const wrapperRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const popupRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);
const arrowRef = ref<HTMLElement | null>(null);
const optionsRef = ref<HTMLElement | null>(null);

const animating = ref(false);
const inputValue = ref(computeLabel(props.modelValue) || '');

const {
    schema,
    onInput: schemaOnInput,
    onBlur: schemaOnBlur
} = useValidation({
    name: props.name
});
const { hasError } = useFormValidationError({
    schema,
    error: props.error
});

const disabled = computed(
    () => !!(props.disabled || formGroup?.disabled.value || form?.disabled.value)
);
const readonly = computed(
    () => !!(props.readonly || formGroup?.readonly.value || form?.readonly.value)
);
const tabIndex = computed(() => (disabled.value ? -1 : props.tabindex));

const currentColor = computed(() => props.color || formGroup?.color.value || form?.color.value);
const currentSize = computed(() => props.size || formGroup?.size.value || form?.size.value);
const { color } = useComponentColor({ componentName, currentColor });
const { size } = useComponentSize({ componentName, currentSize });

const value = computed(() => {
    if (schema.value) {
        return schema.value.value;
    }

    return props.modelValue;
});

const clearable = computed(() => {
    return props.clearable && !disabled.value && !readonly.value && value.value !== '';
});

const componentProps = computed(() => ({
    disabled: props.disabled,
    readonly: props.readonly,
    events: props.events,
    placement: props.placement,
    interactable: props.interactable,
    visible: props.visible,
    animationDuration: props.animationDuration,
    hoverHideDelay: props.hoverHideDelay,
    offset: props.offset
}));
const {
    visible: popupVisible,
    hide,
    show,
    createPopup,
    focusTrigger,
    onClickOutside
} = usePopupControl({
    triggerRef,
    popupRef,
    arrowRef,
    componentProps,
    emit
});

const wrapperClasses = computed(() => ({
    [`-${color.value}`]: true,
    [`-${size.value}`]: true,
    '-error': hasError.value
}));

const popupClasses = computed(() => ({
    '-disabled': disabled.value,
    '-readonly': readonly.value
}));

const inputPlaceholder = computed(() => {
    return value.value ? computeLabel(value.value) : props.placeholder;
});

watch(
    () => value.value,
    (newValue) => {
        inputValue.value = computeLabel(newValue) || '';
    }
);

watch(
    () => inputValue.value,
    (value) => {
        const matchesLength = inputMatchesLength(value);
        const matchesLabel = inputMatchesLabel(value);

        if (matchesLength && !matchesLabel && !animating.value) {
            show();
        }

        emit('search', inputValue.value);
    }
);

watch(
    () => props.options,
    () => {
        if (popupVisible.value) {
            createPopup();
        }
    }
);

useClickOutside({ elementRef: wrapperRef, fn: onClickOutside });

provide(SelectKey, {
    value,
    onInput
});

/**
 * Event bindings
 *
 * Input event handlers for changing the value, clearing the value, clicking,
 * focusing and blurring the input elements.
 */

function onInput(option: SelectOption, label?: string) {
    if (option.disabled) {
        return;
    }

    hide();

    if (label) {
        inputValue.value = label;
    }

    schemaOnInput(props.name, option);
    emit('update:modelValue', option);
}

function onClear() {
    animating.value = true;
    emit('update:modelValue', null);
    nextTick(() => {
        animating.value = false;
    });
}

function onFocus(event: MouseEvent) {
    // If there is no value and there are no default options,
    // do not open select
    if (!value.value && props.options.length === 0) {
        return;
    }

    if (props.autocomplete) {
        inputValue.value = '';
    }

    const focusShouldShowSelect =
        !event.relatedTarget || !wrapperRef.value?.contains(event.relatedTarget);

    if (focusShouldShowSelect && inputShouldShowSelect(inputValue.value)) {
        show();
    }
}

function onBlur(event: MouseEvent) {
    const blurShouldHideSelect =
        !event.relatedTarget || !wrapperRef.value?.contains(event.relatedTarget);

    if (blurShouldHideSelect) {
        hide();
        inputValue.value = computeLabel(value.value);
    }

    schemaOnBlur(props.name, event);
}

function onClick() {
    if (props.autocomplete) {
        inputValue.value = '';
    }

    if (inputShouldShowSelect(inputValue.value)) {
        show();
    }
}

function onClickCaret(event: MouseEvent) {
    if (popupVisible.value) {
        onBlur(event);
    } else {
        focus();
        onFocus(event);
    }

    event.preventDefault();
    event.stopPropagation();
}

/**
 * Infinite scrolling
 *
 * Compute scroll offset, viewport height and total height and determine if next set of items needs to be loaded
 */

function onScroll() {
    if (typeof props.total !== 'undefined' || !bodyRef.value || !optionsRef.value) {
        return;
    }

    const scrollTop = bodyRef.value.scrollTop;
    const viewportHeight = parseInt(getComputedStyle(bodyRef.value).height, 10);
    const totalHeight = parseInt(getComputedStyle(optionsRef.value).height, 10);

    const shouldLoadNextPage = scrollTop + viewportHeight > totalHeight - props.scrollTolerance;
    const endReached = props.options.length >= props.total;

    if (shouldLoadNextPage && !endReached && props.options.length > 0 && !props.loading) {
        emit('pagination');
    }
}

function onWindowResize() {
    onScroll();

    if (popupVisible.value) {
        nextTick().then(() => createPopup());
    }
}

/**
 * Accessibility
 *
 * Keyboard bindings for select input and select options
 */

function onTriggerKeyDown(event: KeyboardEvent) {
    if (props.triggerKeyBindings.length === 0) {
        return;
    }

    const focusableItems = getFocusableItems();
    const activeIndex = focusableItems.findIndex((item: any) => item.active);
    const initialIndex = activeIndex > -1 ? activeIndex : 0;
    const focusTarget = focusableItems[initialIndex];

    switch (true) {
        case isKey('up', event) && props.triggerKeyBindings.includes('up'):
        case isKey('down', event) && props.triggerKeyBindings.includes('down'):
            show();

            setTimeout(
                () => {
                    focusTarget.focus();
                },
                popupVisible.value ? 0 : props.animationDuration
            );

            event.preventDefault();
            event.stopPropagation();
            break;

        case isKey('enter', event) && props.triggerKeyBindings.includes('enter'):
            if (
                props.selectFirstOptionOnEnter &&
                (!value.value || !inputMatchesLabel(inputValue.value))
            ) {
                const firstAvailableOption = props.options.find(
                    (option: any) => !option.disabled
                ) as SelectOption;

                if (firstAvailableOption) {
                    onInput(firstAvailableOption);
                    focus();
                }
            } else {
                onClick();
            }

            if (!popupVisible.value) {
                setTimeout(() => {
                    focusTarget.focus();
                }, props.animationDuration);
            }

            event.preventDefault();
            break;

        case isKey('tab', event) && props.triggerKeyBindings.includes('tab'):
        case isKey('esc', event) && props.triggerKeyBindings.includes('esc'):
            hide();
            break;
    }
}

function onItemKeyDown(event: KeyboardEvent) {
    if (props.itemKeyBindings.length === 0) {
        return;
    }

    switch (true) {
        case isKey('up', event) && props.itemKeyBindings.includes('up'):
        case isKey('down', event) && props.itemKeyBindings.includes('down'):
            const focusableItems = getFocusableItems();

            const currentIndex = focusableItems.findIndex((item) => item === event.target);
            const maxIndex = focusableItems.length - 1;
            let nextIndex;

            if (isKey('up', event)) {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
            } else {
                nextIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
            }

            focusableItems[nextIndex].focus();

            event.preventDefault();
            event.stopPropagation();
            break;

        case isKey('enter', event) && props.itemKeyBindings.includes('enter'):
        case isKey('space', event) && props.itemKeyBindings.includes('space'):
            const target = event.target as HTMLElement;

            target.click();
            focus();

            event.preventDefault();
            break;

        case isKey('tab', event) && props.itemKeyBindings.includes('tab'):
        case isKey('esc', event) && props.itemKeyBindings.includes('esc'):
            hide();
            focus();

            event.preventDefault();
            break;
    }
}

function onEscape() {
    hide();
}

/**
 * Helper methods
 */

function focus() {
    triggerRef.value!.focus();
}

function getFocusableItems(): HTMLElement[] {
    if (!optionsRef.value) {
        return [];
    }

    const focusableItems = [];
    const children = optionsRef.value.children as HTMLCollectionOf<HTMLElement>;

    for (const child of children) {
        if (isFocusable(child)) {
            focusableItems.push(child);
        }
    }

    return focusableItems;
}

function inputMatchesLabel(value: string): boolean {
    return !!(value && value === computeLabel(value));
}

function inputMatchesLength(value: string): boolean {
    return props.minLength === 0 || ((value as any) && value.length >= props.minLength);
}

function inputShouldShowSelect(value: string): boolean {
    if (!props.autocomplete) {
        return true;
    }

    return inputMatchesLength(value) && !inputMatchesLabel(value);
}

function computeLabel(option: Record<string, any> | string | number): string {
    if (typeof option !== 'object') {
        return inputValue.value;
    }

    return isFunction(props.label)
        ? (props.label as (option: Record<string, any> | string | number) => void)(option)
        : getValueByPath(option, props.label as string);
}
</script>

<template>
    <div
        :id="name"
        ref="wrapper"
        class="select-wrapper"
        :class="wrapperClasses"
        :name="name"
        role="combobox"
        aria-haspopup="listbox"
        :aria-owns="`${name}-options`"
        :aria-expanded="popupVisible ? 'true' : 'false'"
        @keyup.esc="onEscape"
    >
        <i-input
            ref="trigger"
            v-model="inputValue"
            autocomplete="off"
            aria-autocomplete="both"
            :aria-controls="`${name}-options`"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :tabindex="tabIndex"
            :plaintext="!autocomplete"
            :placeholder="inputPlaceholder"
            :clearable="isClearable"
            :color="color"
            :size="size"
            :name="`${name}-input`"
            @click="onClick"
            @focus="onFocus"
            @blur="onBlur"
            @clear="onClear"
            @keydown="onTriggerKeyDown"
        >
            <template v-if="$slots.prepend" #prepend>
                <!-- @slot prepend Slot for the select prepend content -->
                <slot name="prepend" />
            </template>
            <template v-if="$slots.prefix" #prefix>
                <!-- @slot prefix Slot for the select prefix content -->
                <slot name="prefix" />
            </template>
            <template #suffix>
                <!-- @slot suffix Slot for the select suffix content -->
                <slot name="suffix" />
                <button
                    class="select-caret"
                    aria-hidden="true"
                    role="button"
                    @click="onClickCaret"
                />
            </template>
            <template v-if="$slots.append" #append>
                <!-- @slot append Slot for the select append content -->
                <slot name="append" />
            </template>
            <template v-if="$slots.clearable" #clearable>
                <!-- @slot clearable Slot for the select clearable button -->
                <slot name="clearable" />
            </template>
        </i-input>

        <transition name="zoom-in-top-transition">
            <div
                v-show="popupVisible"
                :id="`${name}-options`"
                ref="popup"
                class="select"
                :class="popupClasses"
                role="listbox"
                :aria-hidden="popupVisible ? 'false' : 'true'"
            >
                <span v-if="arrow" ref="arrowRef" class="arrow" />
                <div v-if="$slots.header" class="select-header">
                    <!-- @slot header Slot for the select header content -->
                    <slot name="header" />
                </div>
                <div ref="body" class="select-body" @scroll="onScroll">
                    <div v-if="!$slots.default && options.length === 0" class="select-no-results">
                        <!-- @slot no-results Slot for showing no results message -->
                        <slot name="no-results"> There are no results for your query. </slot>
                    </div>
                    <div ref="options" class="select-options">
                        <slot />
                        <i-select-option
                            v-for="option in options"
                            :key="option[idField]"
                            :active="value && value[idField] === option[idField]"
                            :disabled="option.disabled"
                            :value="option"
                            @keydown="onItemKeyDown"
                        >
                            <!-- @slot option Slot for the select option content -->
                            <slot name="option" :option="option">
                                <i-mark
                                    v-if="autocomplete && inputValue !== computeLabel(option)"
                                    :text="computeLabel(option)"
                                    :query="inputValue"
                                />
                                <template v-else> {{ computeLabel(option) }} </template>
                            </slot>
                        </i-select-option>
                    </div>
                </div>
                <div v-if="$slots.footer" class="select-footer">
                    <!-- @slot footer Slot for the select footer content -->
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </div>
</template>

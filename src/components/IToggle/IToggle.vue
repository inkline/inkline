<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { uid } from '@grozav/utils';
import { computedColorValue, computedSizeValue, FormComponentMixin } from '@inkline/inkline/mixins';
import { Classes, InputElementEvent } from '@inkline/inkline/types';

/**
 * Slot for default toggle label
 * @name default
 * @kind slot
 */

const componentName = 'IToggle';

export default defineComponent({
    name: componentName,
    mixins: [FormComponentMixin],
    inject: {
        formGroup: {
            default: (): any => ({})
        },
        form: {
            default: (): any => ({})
        }
    },
    props: {
        /**
         * The color variant of the toggle
         * @type light | dark
         * @default light
         * @name color
         */
        color: {
            type: String,
            default: ''
        },
        /**
         * The disabled state of the toggle
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
         * The indeterminate state of the toggle
         * @type Boolean
         * @default false
         * @name indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Used to set the toggle value when used inside a toggle group
         * @default false
         * @name value
         */
        value: {
            default: false
        },
        /**
         * Used to set the toggle value when used by itself
         * @default false
         * @name modelValue
         */
        modelValue: {
            default: false
        },
        /**
         * The unique identifier of the toggle
         * @type String
         * @default uid()
         * @name name
         */
        name: {
            type: [String, Number],
            default(): string {
                return uid('toggle');
            }
        },
        /**
         * The readonly state of the toggle
         * @type Boolean
         * @default false
         * @name readonly
         */
        readonly: {
            type: Boolean,
            default: false
        },
        /**
         * Render the toggle as rounded
         * @type Boolean
         * @default false
         * @name readonly
         */
        rounded: {
            type: Boolean,
            default: false
        },
        /**
         * The size variant of the toggle
         * @type sm | md | lg
         * @default md
         * @name size
         */
        size: {
            type: String,
            default: ''
        },
        /**
         * The tabindex of the toggle
         * @type Number | String
         * @default 0
         * @name tabindex
         */
        tabindex: {
            type: [Number, String],
            default: 0
        }
    },
    emits: [
        /**
         * Event emitted for setting the modelValue
         * @event update:modelValue
         */
        'update:modelValue'
    ],
    computed: {
        computedColor(): string | undefined {
            return computedColorValue(componentName, this.color);
        },
        computedSize(): string | undefined {
            return computedSizeValue(componentName, this.size);
        },
        classes(): Classes {
            return {
                [`-${this.computedColor}`]: Boolean(this.computedColor),
                [`-${this.computedSize}`]: Boolean(this.computedSize),
                '-disabled': this.isDisabled,
                '-readonly': this.isReadonly,
                '-rounded': this.rounded
                // '-error': hasError.value,
            };
        },
        checked(): boolean {
            if (this.schema) {
                return this.schema.value;
            }

            return this.modelValue;
        },
        tabIndex(): number | string {
            return this.isDisabled ? -1 : this.tabindex;
        }
    },
    methods: {
        clickInputRef() {
            if (this.isReadonly) {
                return;
            }

            (this as any).$refs.input.click();
        },
        onChange(event: InputElementEvent) {
            this.parent.onInput?.(this.name, event.target.checked);

            this.$emit('update:modelValue', event.target.checked);
        },
        onBlur(event: InputElementEvent) {
            this.parent.onBlur?.(this.name, event);
        }
    }
});
</script>

<template>
    <div class="toggle" :class="classes">
        <input
            ref="input"
            type="checkbox"
            :checked="checked"
            :disabled="isDisabled"
            :readonly="isReadonly"
            :aria-checked="checked"
            :aria-disabled="isDisabled"
            :aria-readonly="isReadonly"
            :name="name"
            @change="onChange"
        />
        <label
            class="toggle-label"
            :aria-checked="checked"
            :aria-disabled="isDisabled"
            :aria-readonly="isReadonly"
            :tabindex="tabIndex"
            @click="clickInputRef"
            @blur="onBlur"
            @keydown.space.stop.prevent="clickInputRef"
        >
            <slot />
        </label>
    </div>
</template>
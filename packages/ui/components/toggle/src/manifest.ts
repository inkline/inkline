import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Toggle',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the toggle',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the toggle',
                default: 'false'
            },
            {
                name: 'name',
                type: 'boolean | Array',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'indeterminate',
                type: 'boolean',
                description: 'The indeterminate state of the toggle',
                default: 'false'
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to set the toggle value when used by itself',
                default: 'false'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the toggle',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'boolean',
                description: 'Displays the native browser toggle input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the toggle',
                default: 'false'
            },
            {
                name: 'rounded',
                type: 'boolean',
                description: 'The rounded variant of the toggle',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the toggle',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'number | number',
                description: 'The tabindex of the toggle',
                default: '0'
            },
            {
                name: 'validateSchema',
                type: 'boolean',
                description: 'Enable input validation using schema',
                default: 'true'
            }
        ],
        events: [
            {
                name: 'Toggle',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for default toggle label'
            }
        ],
        css: {
            namespace: 'toggle',
            variables: [
                {
                    name: '--toggle--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--toggle--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--toggle--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--toggle--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--toggle--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--toggle--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--toggle--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--toggle--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--toggle--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--border-width',
                    value: 'var(--toggle--border-top-width) var(--toggle--border-right-width) var(--toggle--border-bottom-width) var(--toggle--border-left-width)'
                },
                {
                    name: '--toggle--border-style',
                    value: 'var(--toggle--border-top-style) var(--toggle--border-right-style) var(--toggle--border-bottom-style) var(--toggle--border-left-style)'
                },
                {
                    name: '--toggle--border-color',
                    value: 'var(--toggle--border-top-color) var(--toggle--border-right-color) var(--toggle--border-bottom-color) var(--toggle--border-left-color)'
                },
                {
                    name: '--toggle--border-top',
                    value: 'var(--toggle--border-top-width) var(--toggle--border-top-style) var(--toggle--border-top-color)'
                },
                {
                    name: '--toggle--border-right',
                    value: 'var(--toggle--border-right-width) var(--toggle--border-right-style) var(--toggle--border-right-color)'
                },
                {
                    name: '--toggle--border-bottom',
                    value: 'var(--toggle--border-bottom-width) var(--toggle--border-bottom-style) var(--toggle--border-bottom-color)'
                },
                {
                    name: '--toggle--border-left',
                    value: 'var(--toggle--border-left-width) var(--toggle--border-left-style) var(--toggle--border-left-color)'
                },
                {
                    name: '--toggle--border',
                    value: 'var(--toggle--border-top-width) var(--toggle--border-top-style) var(--toggle--border-top-color)'
                },
                {
                    name: '--toggle--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--toggle--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--toggle--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--toggle--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--toggle--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--toggle--box-shadow',
                    value: 'var(--toggle--box-shadow-offset-x) var(--toggle--box-shadow-offset-y) var(--toggle--box-shadow-blur-radius) var(--toggle--box-shadow-spread-radius) var(--toggle--box-shadow-color)'
                },
                {
                    name: '--toggle--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--toggle--line-height',
                    value: 'var(--line-height)'
                },
                {
                    name: '--toggle--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--toggle--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toggle--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toggle--transition',
                    value: 'var(--toggle--transition-property) var(--toggle--transition-duration) var(--toggle--transition-timing-function)'
                },
                {
                    name: '--toggle--indicator--scale',
                    value: '0.8'
                },
                {
                    name: '--toggle--indicator--transition-property',
                    value: 'background, transform, top, left'
                },
                {
                    name: '--toggle--indicator--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toggle--indicator--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toggle--indicator--transition',
                    value: 'var(--toggle--indicator--transition-property) var(--toggle--indicator--transition-duration) var(--toggle--indicator--transition-timing-function)'
                },
                {
                    name: '--toggle--indicator--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--toggle--indicator--margin-top',
                    value: '0'
                },
                {
                    name: '--toggle--indicator--margin-right',
                    value: '0'
                },
                {
                    name: '--toggle--indicator--margin-bottom',
                    value: '0'
                },
                {
                    name: '--toggle--indicator--margin-left',
                    value: '0'
                },
                {
                    name: '--toggle--indicator--margin',
                    value: '0'
                },
                {
                    name: '--toggle--indicator--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--toggle--indicator--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--toggle--indicator--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--toggle--indicator--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--toggle--indicator--border-radius',
                    value: 'var(--toggle--indicator--border-top-left-radius) var(--toggle--indicator--border-top-right-radius) var(--toggle--indicator--border-bottom-right-radius) var(--toggle--indicator--border-bottom-left-radius)'
                },
                {
                    name: '--toggle--disabled--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--toggle--disabled--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--toggle--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--toggle--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--toggle--disabled--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--toggle--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--toggle--disabled--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--toggle--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--toggle--disabled--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--toggle--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--toggle--disabled--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--disabled--border-width',
                    value: 'var(--toggle--disabled--border-top-width) var(--toggle--disabled--border-right-width) var(--toggle--disabled--border-bottom-width) var(--toggle--disabled--border-left-width)'
                },
                {
                    name: '--toggle--disabled--border-style',
                    value: 'var(--toggle--disabled--border-top-style) var(--toggle--disabled--border-right-style) var(--toggle--disabled--border-bottom-style) var(--toggle--disabled--border-left-style)'
                },
                {
                    name: '--toggle--disabled--border-color',
                    value: 'var(--toggle--disabled--border-top-color) var(--toggle--disabled--border-right-color) var(--toggle--disabled--border-bottom-color) var(--toggle--disabled--border-left-color)'
                },
                {
                    name: '--toggle--disabled--border-top',
                    value: 'var(--toggle--disabled--border-top-width) var(--toggle--disabled--border-top-style) var(--toggle--disabled--border-top-color)'
                },
                {
                    name: '--toggle--disabled--border-right',
                    value: 'var(--toggle--disabled--border-right-width) var(--toggle--disabled--border-right-style) var(--toggle--disabled--border-right-color)'
                },
                {
                    name: '--toggle--disabled--border-bottom',
                    value: 'var(--toggle--disabled--border-bottom-width) var(--toggle--disabled--border-bottom-style) var(--toggle--disabled--border-bottom-color)'
                },
                {
                    name: '--toggle--disabled--border-left',
                    value: 'var(--toggle--disabled--border-left-width) var(--toggle--disabled--border-left-style) var(--toggle--disabled--border-left-color)'
                },
                {
                    name: '--toggle--disabled--border',
                    value: 'var(--toggle--disabled--border-top-width) var(--toggle--disabled--border-top-style) var(--toggle--disabled--border-top-color)'
                },
                {
                    name: '--toggle--disabled--indicator--background',
                    value: 'var(--color-light-shade-150)'
                },
                {
                    name: '--toggle--readonly--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--toggle--readonly--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--toggle--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--toggle--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--toggle--readonly--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--toggle--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--toggle--readonly--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--toggle--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--toggle--readonly--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--toggle--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--toggle--readonly--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--readonly--border-width',
                    value: 'var(--toggle--readonly--border-top-width) var(--toggle--readonly--border-right-width) var(--toggle--readonly--border-bottom-width) var(--toggle--readonly--border-left-width)'
                },
                {
                    name: '--toggle--readonly--border-style',
                    value: 'var(--toggle--readonly--border-top-style) var(--toggle--readonly--border-right-style) var(--toggle--readonly--border-bottom-style) var(--toggle--readonly--border-left-style)'
                },
                {
                    name: '--toggle--readonly--border-color',
                    value: 'var(--toggle--readonly--border-top-color) var(--toggle--readonly--border-right-color) var(--toggle--readonly--border-bottom-color) var(--toggle--readonly--border-left-color)'
                },
                {
                    name: '--toggle--readonly--border-top',
                    value: 'var(--toggle--readonly--border-top-width) var(--toggle--readonly--border-top-style) var(--toggle--readonly--border-top-color)'
                },
                {
                    name: '--toggle--readonly--border-right',
                    value: 'var(--toggle--readonly--border-right-width) var(--toggle--readonly--border-right-style) var(--toggle--readonly--border-right-color)'
                },
                {
                    name: '--toggle--readonly--border-bottom',
                    value: 'var(--toggle--readonly--border-bottom-width) var(--toggle--readonly--border-bottom-style) var(--toggle--readonly--border-bottom-color)'
                },
                {
                    name: '--toggle--readonly--border-left',
                    value: 'var(--toggle--readonly--border-left-width) var(--toggle--readonly--border-left-style) var(--toggle--readonly--border-left-color)'
                },
                {
                    name: '--toggle--readonly--border',
                    value: 'var(--toggle--readonly--border-top-width) var(--toggle--readonly--border-top-style) var(--toggle--readonly--border-top-color)'
                },
                {
                    name: '--toggle--readonly--indicator--background',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--toggle--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--toggle--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--toggle--checked--background',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--toggle--checked--border-top-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--border-top-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--border-top-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--toggle--checked--border-right-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--border-right-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--border-right-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--toggle--checked--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--border-bottom-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--toggle--checked--border-left-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--border-left-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--border-left-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--toggle--checked--border-width',
                    value: 'var(--toggle--checked--border-top-width) var(--toggle--checked--border-right-width) var(--toggle--checked--border-bottom-width) var(--toggle--checked--border-left-width)'
                },
                {
                    name: '--toggle--checked--border-style',
                    value: 'var(--toggle--checked--border-top-style) var(--toggle--checked--border-right-style) var(--toggle--checked--border-bottom-style) var(--toggle--checked--border-left-style)'
                },
                {
                    name: '--toggle--checked--border-color',
                    value: 'var(--toggle--checked--border-top-color) var(--toggle--checked--border-right-color) var(--toggle--checked--border-bottom-color) var(--toggle--checked--border-left-color)'
                },
                {
                    name: '--toggle--checked--border-top',
                    value: 'var(--toggle--checked--border-top-width) var(--toggle--checked--border-top-style) var(--toggle--checked--border-top-color)'
                },
                {
                    name: '--toggle--checked--border-right',
                    value: 'var(--toggle--checked--border-right-width) var(--toggle--checked--border-right-style) var(--toggle--checked--border-right-color)'
                },
                {
                    name: '--toggle--checked--border-bottom',
                    value: 'var(--toggle--checked--border-bottom-width) var(--toggle--checked--border-bottom-style) var(--toggle--checked--border-bottom-color)'
                },
                {
                    name: '--toggle--checked--border-left',
                    value: 'var(--toggle--checked--border-left-width) var(--toggle--checked--border-left-style) var(--toggle--checked--border-left-color)'
                },
                {
                    name: '--toggle--checked--border',
                    value: 'var(--toggle--checked--border-top-width) var(--toggle--checked--border-top-style) var(--toggle--checked--border-top-color)'
                },
                {
                    name: '--toggle--checked--disabled--background',
                    value: 'var(--color-primary-200)'
                },
                {
                    name: '--toggle--checked--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--disabled--border-top-color',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--toggle--checked--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--disabled--border-right-color',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-color',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--toggle--checked--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--disabled--border-left-color',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--toggle--checked--disabled--border-width',
                    value: 'var(--toggle--checked--disabled--border-top-width) var(--toggle--checked--disabled--border-right-width) var(--toggle--checked--disabled--border-bottom-width) var(--toggle--checked--disabled--border-left-width)'
                },
                {
                    name: '--toggle--checked--disabled--border-style',
                    value: 'var(--toggle--checked--disabled--border-top-style) var(--toggle--checked--disabled--border-right-style) var(--toggle--checked--disabled--border-bottom-style) var(--toggle--checked--disabled--border-left-style)'
                },
                {
                    name: '--toggle--checked--disabled--border-color',
                    value: 'var(--toggle--checked--disabled--border-top-color) var(--toggle--checked--disabled--border-right-color) var(--toggle--checked--disabled--border-bottom-color) var(--toggle--checked--disabled--border-left-color)'
                },
                {
                    name: '--toggle--checked--disabled--border-top',
                    value: 'var(--toggle--checked--disabled--border-top-width) var(--toggle--checked--disabled--border-top-style) var(--toggle--checked--disabled--border-top-color)'
                },
                {
                    name: '--toggle--checked--disabled--border-right',
                    value: 'var(--toggle--checked--disabled--border-right-width) var(--toggle--checked--disabled--border-right-style) var(--toggle--checked--disabled--border-right-color)'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom',
                    value: 'var(--toggle--checked--disabled--border-bottom-width) var(--toggle--checked--disabled--border-bottom-style) var(--toggle--checked--disabled--border-bottom-color)'
                },
                {
                    name: '--toggle--checked--disabled--border-left',
                    value: 'var(--toggle--checked--disabled--border-left-width) var(--toggle--checked--disabled--border-left-style) var(--toggle--checked--disabled--border-left-color)'
                },
                {
                    name: '--toggle--checked--disabled--border',
                    value: 'var(--toggle--checked--disabled--border-top-width) var(--toggle--checked--disabled--border-top-style) var(--toggle--checked--disabled--border-top-color)'
                },
                {
                    name: '--toggle--checked--disabled--indicator--background',
                    value: 'var(--color-light-tint-50)'
                },
                {
                    name: '--toggle--checked--readonly--background',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--toggle--checked--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--readonly--border-top-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--toggle--checked--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--readonly--border-right-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--toggle--checked--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--toggle--checked--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--toggle--checked--readonly--border-left-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--toggle--checked--readonly--border-width',
                    value: 'var(--toggle--checked--readonly--border-top-width) var(--toggle--checked--readonly--border-right-width) var(--toggle--checked--readonly--border-bottom-width) var(--toggle--checked--readonly--border-left-width)'
                },
                {
                    name: '--toggle--checked--readonly--border-style',
                    value: 'var(--toggle--checked--readonly--border-top-style) var(--toggle--checked--readonly--border-right-style) var(--toggle--checked--readonly--border-bottom-style) var(--toggle--checked--readonly--border-left-style)'
                },
                {
                    name: '--toggle--checked--readonly--border-color',
                    value: 'var(--toggle--checked--readonly--border-top-color) var(--toggle--checked--readonly--border-right-color) var(--toggle--checked--readonly--border-bottom-color) var(--toggle--checked--readonly--border-left-color)'
                },
                {
                    name: '--toggle--checked--readonly--border-top',
                    value: 'var(--toggle--checked--readonly--border-top-width) var(--toggle--checked--readonly--border-top-style) var(--toggle--checked--readonly--border-top-color)'
                },
                {
                    name: '--toggle--checked--readonly--border-right',
                    value: 'var(--toggle--checked--readonly--border-right-width) var(--toggle--checked--readonly--border-right-style) var(--toggle--checked--readonly--border-right-color)'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom',
                    value: 'var(--toggle--checked--readonly--border-bottom-width) var(--toggle--checked--readonly--border-bottom-style) var(--toggle--checked--readonly--border-bottom-color)'
                },
                {
                    name: '--toggle--checked--readonly--border-left',
                    value: 'var(--toggle--checked--readonly--border-left-width) var(--toggle--checked--readonly--border-left-style) var(--toggle--checked--readonly--border-left-color)'
                },
                {
                    name: '--toggle--checked--readonly--border',
                    value: 'var(--toggle--checked--readonly--border-top-width) var(--toggle--checked--readonly--border-top-style) var(--toggle--checked--readonly--border-top-color)'
                },
                {
                    name: '--toggle--checked--readonly--indicator--background',
                    value: 'var(--color-light-tint-100)'
                },
                {
                    name: '--toggle--checked--indicator--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--toggle--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--toggle--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--toggle--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--toggle--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--toggle--border-radius',
                    value: 'var(--toggle--border-top-left-radius) var(--toggle--border-top-right-radius) var(--toggle--border-bottom-right-radius) var(--toggle--border-bottom-left-radius)'
                },
                {
                    name: '--toggle--margin-top',
                    value: '0'
                },
                {
                    name: '--toggle--margin-right',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--toggle--margin-bottom',
                    value: '0'
                },
                {
                    name: '--toggle--margin-left',
                    value: '0'
                },
                {
                    name: '--toggle--margin',
                    value: 'var(--toggle--margin-top) var(--toggle--margin-right) var(--toggle--margin-bottom) var(--toggle--margin-left)'
                },
                {
                    name: '--toggle--width',
                    value: 'calc(var(--spacing-md) * 2)'
                },
                {
                    name: '--toggle--height',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--toggle--{color}--background'
                },
                {
                    name: '--toggle--{color}--border-top-color'
                },
                {
                    name: '--toggle--{color}--border-right-color'
                },
                {
                    name: '--toggle--{color}--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--border-left-color'
                },
                {
                    name: '--toggle--{color}--color'
                },
                {
                    name: '--toggle--{color}--disabled--background'
                },
                {
                    name: '--toggle--{color}--disabled--border-top-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-right-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-left-color'
                },
                {
                    name: '--toggle--{color}--disabled--indicator--background'
                },
                {
                    name: '--toggle--{color}--readonly--background'
                },
                {
                    name: '--toggle--{color}--readonly--border-top-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-right-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-left-color'
                },
                {
                    name: '--toggle--{color}--readonly--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--background'
                },
                {
                    name: '--toggle--{color}--checked--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--background'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--readonly--background'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--indicator--background'
                },
                {
                    name: '--toggle--{color}--indicator--background'
                },
                {
                    name: '--toggle--{size}--border-top-left-radius'
                },
                {
                    name: '--toggle--{size}--border-top-right-radius'
                },
                {
                    name: '--toggle--{size}--border-bottom-right-radius'
                },
                {
                    name: '--toggle--{size}--border-bottom-left-radius'
                },
                {
                    name: '--toggle--{size}--font-size'
                },
                {
                    name: '--toggle--{size}--margin-top'
                },
                {
                    name: '--toggle--{size}--margin-right'
                },
                {
                    name: '--toggle--{size}--margin-bottom'
                },
                {
                    name: '--toggle--{size}--margin-left'
                },
                {
                    name: '--toggle--{size}--width'
                },
                {
                    name: '--toggle--{size}--height'
                },
                {
                    name: '--toggle--{size}--indicator--margin-top'
                },
                {
                    name: '--toggle--{size}--indicator--margin-right'
                },
                {
                    name: '--toggle--{size}--indicator--margin-bottom'
                },
                {
                    name: '--toggle--{size}--indicator--margin-left'
                },
                {
                    name: '--toggle--{size}--indicator--border-top-left-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-top-right-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-bottom-right-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-bottom-left-radius'
                }
            ]
        }
    }
];

export default manifest;

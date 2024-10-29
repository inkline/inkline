import type { FormOption } from './forms';

/**
 * Select
 */

export interface SelectOption extends FormOption {
    active?: boolean;
}

/**
 * Checkbox
 */

export interface CheckboxGroupOption extends FormOption {
    indeterminate?: boolean;
}

/**
 * Radio
 */

export type RadioGroupOption = FormOption;

/**
 * Popup
 */

export type PopupTriggerListener = 'hover' | 'click' | 'focus' | 'manual';

/**
 * DOM
 */

export interface DOMNode {
    type: string;
    props?: Record<string, string>;
    children?: DOMNode[];
}

/**
 * Icon
 */

export interface IconDefinition {
    prefix: string;
    name: string;
    body: DOMNode[];
}

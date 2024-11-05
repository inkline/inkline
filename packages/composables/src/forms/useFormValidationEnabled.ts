import { ValidateOnEvent } from '@inkline/types';
import { computed, Ref } from 'vue';
import { useOptions } from '../useOptions';

export type UseFormValidationEnabledOptions = {
    validateOn: Ref<ValidateOnEvent[] | ValidateOnEvent | undefined>;
    shouldValidateOverride: Ref<boolean>;
};

export const validateOnEvents: ValidateOnEvent[] = ['blur', 'input', 'change', 'submit'];

export function useFormValidationEnabled({
    validateOn,
    shouldValidateOverride
}: UseFormValidationEnabledOptions) {
    const { options } = useOptions();

    /**
     * Determines if form event should trigger validation
     */
    const shouldValidate = computed<Record<string, ValidateOnEvent>>(() => {
        if (!shouldValidateOverride.value) {
            return {};
        }

        const events: ValidateOnEvent[] = [];

        if (validateOn.value) {
            if (Array.isArray(validateOn.value)) {
                events.push(...validateOn.value);
            } else {
                events.push(validateOn.value);
            }
        } else if (options.value.validation.validateOn) {
            events.push(...options.value.validation.validateOn);
        }

        return validateOnEvents.reduce<Record<ValidateOnEvent, boolean>>(
            (acc, eventName) => {
                acc[eventName] = events.includes(eventName);
                return acc;
            },
            {
                blur: false,
                input: false,
                change: false,
                submit: false
            }
        );
    });

    return {
        shouldValidate
    };
}

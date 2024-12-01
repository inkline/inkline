import { ValidateOnEvent } from '@inkline/types';
import { computed, MaybeRef, unref } from 'vue';
import { useOptions } from '../useOptions';

export type UseFormValidationEnabledOptions = {
    validateOn: MaybeRef<ValidateOnEvent[] | ValidateOnEvent | undefined>;
    shouldValidateOverride: MaybeRef<boolean>;
};

export const validateOnEvents: ValidateOnEvent[] = ['blur', 'input', 'change', 'submit'];

export function useFormValidationEnabled(formOptions: UseFormValidationEnabledOptions) {
    const { options } = useOptions();

    /**
     * Determines if form event should trigger validation
     */
    const shouldValidate = computed<Record<string, ValidateOnEvent>>(() => {
        const shouldValidateOverride = unref(formOptions.shouldValidateOverride);
        const validateOn = unref(formOptions.validateOn);

        if (!shouldValidateOverride) {
            return {};
        }

        const events: ValidateOnEvent[] = [];

        if (validateOn) {
            if (Array.isArray(validateOn)) {
                events.push(...validateOn);
            } else {
                events.push(validateOn);
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

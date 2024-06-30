import { getValueByPath } from '@grozav/utils';
import type { FormValidatorFn, FormValue } from '@inkline/inkline/types';

export const sameAs: FormValidatorFn<{
    target?: string;
}> = (value: FormValue, options) => {
    if (!options.target) {
        console.error('The "target" option must be specified for "sameAs" validator.');
        return false;
    }

    const targetSchema = getValueByPath(options.schema, options.target);
    if (!targetSchema) {
        throw new Error(
            `Could not find target with name '${options.target}' in 'sameAs' validator.`
        );
    }

    return value === targetSchema.value;
};

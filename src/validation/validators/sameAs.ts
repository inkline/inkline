import { getValueByPath } from '@grozav/utils';

export function sameAs(value: any, options: any = {}) {
    if (!options.target) {
        return false;
    }

    const targetSchema = getValueByPath(options.schema(), options.target);

    if (!targetSchema) {
        throw new Error(
            `Could not find target with name '${options.target}' in 'sameAs' validator.`
        );
    }

    return value === targetSchema.value;
}

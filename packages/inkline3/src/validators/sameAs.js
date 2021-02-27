export function sameAs(value, options = {}, rootSchema = {}) {
    if (!options.target) {
        return false;
    }

    const targetSchema = options.target
        .split('.')
        .reduce((acc, key) => acc && acc[key], rootSchema);

    if (!targetSchema) {
        throw new Error(`Could not find target with name '${options.target}' in 'sameAs' validator.`);
    }

    return value === targetSchema.value;
}

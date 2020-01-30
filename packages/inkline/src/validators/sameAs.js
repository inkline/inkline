export function sameAs(value, options = {}, schemaOptions = {}) {
    if (!options.target) {
        return false;
    }

    const schema = schemaOptions.getSchema();
    const targetSchema = options.target
        .split('.')
        .reduce((acc, key) => acc && acc[key], schema);

    if (!targetSchema) {
        throw new Error(`Could not find target with name '${options.target}' in 'sameAs' validator.`);
    }

    return value === targetSchema.value;
}
import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";

/**
 * Construct a basic form schema with default values
 */
export function $form(name, schema) {
    if (typeof name !== 'string') {
        schema = name;
        name = '';
    }

    const nameNesting = name === '' ? [] : name.split('.');

    return $form.builder.factory(nameNesting, schema, true);
}

$form.builder = new FormBuilder();

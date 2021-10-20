import { initialize } from '@inkline/inkline/validation';
import { defaultFieldValidationValues, defaultValidationValues } from '@inkline/inkline/constants';

describe('validation', () => {
    describe('initialize()', () => {
        it('should add default validation values to group', () => {
            const schema: any = {
                field: {}
            };

            initialize(schema);

            Object.entries(defaultValidationValues).forEach(([key, value]) => {
                expect(schema[key]).toEqual(value);
            });
        });

        it('should add default validation values and field validation values to field', () => {
            const schema: any = {
                field: {}
            };

            initialize(schema);

            Object.entries({ ...defaultValidationValues, ...defaultFieldValidationValues }).forEach(([key, value]) => {
                expect(schema.field[key]).toEqual(value);
            });
        });

        it('should determine that schema is field using validators', () => {
            const schema: any = {
                field: {
                    validators: []
                }
            };

            initialize(schema);

            expect(schema.field.value).toBeDefined();
        });

        it('should determine that schema is field using value', () => {
            const schema: any = {
                field: {
                    value: ''
                }
            };

            initialize(schema);

            expect(schema.field.validators).toBeDefined();
        });

        it('should not overwrite validation value if it already exists', () => {
            const schema: any = {
                field: {
                    dirty: true
                }
            };

            initialize(schema);

            expect(schema.field.dirty).toEqual(true);
        });
    });
});

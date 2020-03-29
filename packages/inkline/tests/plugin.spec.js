import { form } from '@inkline/inkline/src/prototypes/form';
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

describe('Prototypes', () => {
    describe('form()', () => {
        it('should be callable only with schema', () => {
            const formSchema = form({});

            expect(formSchema).toBeDefined();
        });

        it('should be callable with name and schema', () => {
            const formSchema = form('name', {});

            expect(formSchema).toBeDefined();
        });

        it('should call build() function', () => {
            const spy = jest.spyOn(FormBuilder, 'build');

            form({});

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('', {}, { group: true, root: true });
        });

        it('should call build() function with name nesting', () => {
            const spy = jest.spyOn(FormBuilder, 'build');

            form('a.b.c', {});

            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith('a.b.c', {}, { group: true, root: true });
        });
    });
});

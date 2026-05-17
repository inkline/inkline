import { i18n, setLocale, translate } from '../index';

describe('i18n', () => {
    describe('translate()', () => {
        it('should find and translate given path', () => {
            const value = 'This is an example';

            i18n.messages.en.example = value;
            expect(translate('example')).toEqual(value);
        });

        it('should find and translate given nested path', () => {
            const value = 'This is an example';

            i18n.messages.en.nested = { example: value };
            expect(translate('nested.example')).toEqual(value);
        });

        it('should find and translate by calling function at given path', () => {
            const value = () => 'This is an example';

            i18n.messages.en.function = value;
            expect(translate('function')).toEqual(value());
        });

        it('should return path if translation not found', () => {
            expect(translate('does.not.exist')).toEqual('does.not.exist');
        });

        it('should interpolate given params', () => {
            const value = 'This is an {{param}}';
            const params = { param: 'example' };

            i18n.messages.en.interpolated = value;
            expect(translate('interpolated', params)).toEqual(
                value.replace('{{param}}', params.param)
            );
        });

        it('should translate using current locale', () => {
            const value = 'Dies ist ein Beispiel';

            i18n.messages.de = { example: value };
            setLocale('de');
            expect(translate('example')).toEqual(value);
            setLocale('en');
        });
    });
});

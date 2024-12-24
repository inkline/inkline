import { i18n, setLocale } from '@inkline/inkline/i18n';

describe('i18n', () => {
    describe('setLocale()', () => {
        it('should set current i18n locale', () => {
            const locale = 'de';

            setLocale(locale);

            expect(i18n.locale).toEqual(locale);
        });
    });
});

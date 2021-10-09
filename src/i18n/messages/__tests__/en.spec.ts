import { translate } from '@inkline/inkline/i18n';
import { en } from '@inkline/inkline/i18n/messages/en';

describe('i18n', () => {
    describe('messages', () => {
        describe('en', () => {
            describe('validation', () => {
                describe('alpha', () => {
                    it('should find and translate given path', () => {
                        const params = {};

                        expect(translate('validation.alpha', params)).toEqual((en.validation as any).alpha(params));
                    });

                    it('should find and translate given path with allowDashes', () => {
                        const params = { allowDashes: true };

                        expect(translate('validation.alpha', params)).toEqual((en.validation as any).alpha(params));
                    });

                    it('should find and translate given path with allowSpaces', () => {
                        const params = { allowSpaces: true };

                        expect(translate('validation.alpha', params)).toEqual((en.validation as any).alpha(params));
                    });

                    it('should find and translate given path with allowDashes and allowSpaces', () => {
                        const params = { allowDashes: true, allowSpaces: true };

                        expect(translate('validation.alpha', params)).toEqual((en.validation as any).alpha(params));
                    });
                });

                describe('alphanumeric', () => {
                    it('should find and translate given path', () => {
                        const params = {};

                        expect(translate('validation.alphanumeric', params)).toEqual((en.validation as any).alphanumeric(params));
                    });

                    it('should find and translate given path with allowDashes', () => {
                        const params = { allowDashes: true };

                        expect(translate('validation.alphanumeric', params)).toEqual((en.validation as any).alphanumeric(params));
                    });

                    it('should find and translate given path with allowSpaces', () => {
                        const params = { allowSpaces: true };

                        expect(translate('validation.alphanumeric', params)).toEqual((en.validation as any).alphanumeric(params));
                    });

                    it('should find and translate given path with allowDashes and allowSpaces', () => {
                        const params = { allowDashes: true, allowSpaces: true };

                        expect(translate('validation.alphanumeric', params)).toEqual((en.validation as any).alphanumeric(params));
                    });
                });

                describe('number', () => {
                    it('should find and translate given path', () => {
                        const params = {};

                        expect(translate('validation.number', params)).toEqual((en.validation as any).number(params));
                    });

                    it('should find and translate given path with allowNegative', () => {
                        const params = { allowNegative: true };

                        expect(translate('validation.number', params)).toEqual((en.validation as any).number(params));
                    });

                    it('should find and translate given path with allowDecimal', () => {
                        const params = { allowDecimal: true };

                        expect(translate('validation.number', params)).toEqual((en.validation as any).number(params));
                    });

                    it('should find and translate given path with allowNegative and allowDecimal', () => {
                        const params = { allowNegative: true, allowDecimal: true };

                        expect(translate('validation.number', params)).toEqual((en.validation as any).number(params));
                    });
                });

                ['email', 'max', 'maxLength', 'min', 'minLength', 'required', 'sameAs', 'custom'].forEach((validator) => {
                    describe(validator, () => {
                        it('should find and translate given path', () => {
                            const params = {};

                            expect(translate(`validation.${validator}`, params)).toEqual((en.validation as any)[validator](params));
                        });
                    });
                });
            });
        });
    });
});

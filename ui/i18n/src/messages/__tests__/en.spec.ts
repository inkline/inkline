import { translate } from '../../translate';

describe('i18n', () => {
    describe('messages', () => {
        describe('en', () => {
            describe('validation', () => {
                describe('alpha', () => {
                    it('should translate with default params', () => {
                        const result = translate('validation.alpha', {});
                        expect(result).toEqual('Please enter letters only.');
                    });

                    it('should translate with allowDashes', () => {
                        const result = translate('validation.alpha', {
                            params: { allowDashes: true }
                        });
                        expect(result).toEqual('Please enter letters and dashes only.');
                    });

                    it('should translate with allowSpaces', () => {
                        const result = translate('validation.alpha', {
                            params: { allowSpaces: true }
                        });
                        expect(result).toEqual('Please enter letters and spaces only.');
                    });

                    it('should translate with allowDashes and allowSpaces', () => {
                        const result = translate('validation.alpha', {
                            params: {
                                allowDashes: true,
                                allowSpaces: true
                            }
                        });
                        expect(result).toEqual('Please enter letters, spaces, and dashes only.');
                    });
                });

                describe('alphanumeric', () => {
                    it('should translate with default params', () => {
                        const result = translate('validation.alphanumeric', {});
                        expect(result).toEqual('Please enter letters and numbers only.');
                    });

                    it('should translate with allowDashes', () => {
                        const result = translate('validation.alphanumeric', {
                            params: { allowDashes: true }
                        });
                        expect(result).toEqual('Please enter letters, numbers, and dashes only.');
                    });

                    it('should translate with allowSpaces', () => {
                        const result = translate('validation.alphanumeric', {
                            params: { allowSpaces: true }
                        });
                        expect(result).toEqual('Please enter letters, numbers, and spaces only.');
                    });

                    it('should translate with allowDashes and allowSpaces', () => {
                        const result = translate('validation.alphanumeric', {
                            params: {
                                allowDashes: true,
                                allowSpaces: true
                            }
                        });
                        expect(result).toEqual(
                            'Please enter letters, numbers, spaces, and dashes only.'
                        );
                    });
                });

                describe('number', () => {
                    it('should translate with default params', () => {
                        const result = translate('validation.number', {});
                        expect(result).toEqual('Please enter numbers only.');
                    });

                    it('should translate with allowNegative', () => {
                        const result = translate('validation.number', {
                            params: { allowNegative: true }
                        });
                        expect(result).toEqual('Please enter positive or negative numbers only.');
                    });

                    it('should translate with allowDecimal', () => {
                        const result = translate('validation.number', {
                            params: { allowDecimal: true }
                        });
                        expect(result).toEqual('Please enter decimal numbers only.');
                    });

                    it('should translate with allowDecimal and allowNegative', () => {
                        const result = translate('validation.number', {
                            params: { allowDecimal: true, allowNegative: true }
                        });
                        expect(result).toEqual(
                            'Please enter positive or negative decimal numbers only.'
                        );
                    });
                });

                describe('maxLength', () => {
                    it('should translate with string value', () => {
                        const result = translate('validation.maxLength', {
                            value: 'string',
                            params: { value: 10 }
                        });
                        expect(result).toEqual('Please enter up to 10 characters.');
                    });

                    it('should translate with array value', () => {
                        const result = translate('validation.maxLength', {
                            value: ['string'],
                            params: { value: 10 }
                        });
                        expect(result).toEqual('Please select up to 10 items.');
                    });
                });

                describe('minLength', () => {
                    it('should translate with string value', () => {
                        const result = translate('validation.minLength', {
                            value: 'string',
                            params: { value: 10 }
                        });
                        expect(result).toEqual('Please enter at least 10 characters.');
                    });

                    it('should translate with array value', () => {
                        const result = translate('validation.minLength', {
                            value: ['string'],
                            params: { value: 1 }
                        });
                        expect(result).toEqual('Please select at least 1 items.');
                    });
                });

                describe.each([
                    ['email', 'Please enter a valid email address.', {}],
                    ['max', 'Please enter a maximum value of 10.', { params: { value: 10 } }],
                    ['min', 'Please enter a minimum value of 10.', { params: { value: 10 } }],
                    ['required', 'Please enter a value for this field.', {}],
                    ['sameAs', 'Please make sure that the two values match.', {}],
                    ['custom', 'Please enter a correct value for this field.', {}]
                ])('%s', (validator: string, expected: string, params: Record<string, any>) => {
                    it('should translate with default params', () => {
                        const result = translate(`validation.${validator}`, params);
                        expect(result).toEqual(expected);
                    });
                });
            });
        });
    });
});

import { colorVariantClass } from '@inkline/inkline/mixins';

describe('mixins', () => {
    describe('classes', () => {
        describe('colorVariantClass()', () => {
            it('should return -{color} if colorClass', () => {
                const component = { color: 'primary' };

                expect(colorVariantClass(component)).toHaveProperty(`-${component.color}`, true);
            });

            it('should return -{colorMode} if not colorClass', () => {
                const component = {
                    $inkline: {
                        options: {
                            colorMode: 'dark'
                        }
                    }
                };

                expect(colorVariantClass(component)).toHaveProperty(`-${component.$inkline.options.colorMode}`, true);
            });

            it('should return -light if system colorMode and not colorClass', () => {
                const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                matchMediaSpy.mockImplementation(() => ({
                    matches: false
                }));

                const component = {
                    $inkline: {
                        options: {
                            colorMode: 'system'
                        }
                    }
                };

                expect(colorVariantClass(component)).toHaveProperty('-light', true);
            });

            it('should return -dark if system colorMode and not colorClass', () => {
                const matchMediaSpy = jest.spyOn(global.window as any, 'matchMedia');
                matchMediaSpy.mockImplementation(() => ({
                    matches: true
                }));

                const component = {
                    $inkline: {
                        options: {
                            colorMode: 'system'
                        }
                    }
                };

                expect(colorVariantClass(component)).toHaveProperty('-dark', true);
            });
        });
    });
});

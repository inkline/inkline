import { Inkline } from "@inkline/inkline/src/plugin";
import * as addClassHelper from "@inkline/inkline/src/helpers/addClass";
import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";
import { createLocalVue } from "@vue/test-utils";


describe('Plugin', () => {
    describe('install()', () => {
        let localVue;

        beforeEach(() => {
            localVue = createLocalVue();
        });

        it('should register each specified component as a vue component', () => {
            const spy = jest.spyOn(localVue, 'component');
            const components = [
                { name: 'component1' },
                { name: 'component2' },
                { name: 'component3' },
            ];

            Inkline.install(localVue, {
                components
            });

            expect(spy).toHaveBeenCalledWith(components[0].name, components[0]);
            expect(spy).toHaveBeenCalledWith(components[1].name, components[1]);
            expect(spy).toHaveBeenCalledWith(components[2].name, components[2]);
        });

        it('should add inkline and variant class to body', () => {
            const spy = jest.spyOn(addClassHelper, 'addClass');

            Inkline.install(localVue);

            expect(spy).toHaveBeenCalledWith(document.body, 'inkline');
            expect(spy).toHaveBeenCalledWith(document.body, '-light');
        });

        describe('$inkline', () => {
            let vm;

            beforeEach(() => {
                window.localStorage.removeItem('inkline-variant');

                Inkline.install(localVue);

                vm = localVue.prototype.$inkline._vm;
            });

            describe('vm', () => {
                it('should be defined', () => {
                    expect(vm).toBeDefined();
                });

                describe('data', () => {
                    it('should be defined', () => {
                        expect(vm.$data).toEqual({
                            config: {
                                variant: null,
                                autodetectVariant: false,
                                validation: {
                                    on: ['input']
                                }
                            }
                        });
                    });
                });

                describe('watch', () => {
                    describe('config', () => {
                        it('should set body class to new variant', (done) => {
                            const spy = jest.spyOn(addClassHelper, 'addClass');

                            vm.$data.config.variant = 'dark';

                            vm.$nextTick(() => {
                                expect(spy).toHaveBeenCalledWith(document.body, '-dark');
                                done();
                            });
                        });
                    });
                });

                describe('created', () => {
                    it('should reset variant to make sure components are updated', (done) => {
                        setTimeout(() => {
                            expect(vm.$data.config.variant).toEqual('light');
                            done();
                        });
                    });

                    it('should set variant to light if autodetectVariant is true', (done) => {
                        Inkline.install(localVue, {
                            config: {
                                autodetectVariant: true
                            }
                        });

                        setTimeout(() => {
                            expect(vm.$data.config.variant).toEqual('light');
                            done();
                        });
                    });

                    it('should set variant to dark if autodetectVariant is true', (done) => {
                        let matchMedia = window.matchMedia;
                        window.matchMedia = () => ({ matches: [] });

                        Inkline.install(localVue, {
                            config: {
                                autodetectVariant: true
                            }
                        });

                        setTimeout(() => {
                            expect(localVue.prototype.$inkline._vm.$data.config.variant).toEqual('dark');
                            done();
                        });

                        window.matchMedia = matchMedia;
                    });
                });
            });

            describe('config', () => {
                it('should return internal vm config data', () => {
                    expect(localVue.prototype.$inkline.config)
                        .toEqual(vm.$data.config);
                });
            });

            describe('form()', () => {
                it('should be callable only with schema', () => {
                    const formSchema = localVue.prototype.$inkline.form({});

                    expect(formSchema).toBeDefined();
                });

                it('should be callable with name and schema', () => {
                    const formSchema = localVue.prototype.$inkline.form('name', {});

                    expect(formSchema).toBeDefined();
                });

                it('should call build() function', () => {
                    const spy = jest.spyOn(FormBuilder, 'build');

                    localVue.prototype.$inkline.form({});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('', {}, { group: true, root: true });
                });

                it('should call build() function with name nesting', () => {
                    const spy = jest.spyOn(FormBuilder, 'build');

                    localVue.prototype.$inkline.form('a.b.c', {});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('a.b.c', {}, { group: true, root: true });
                });
            });
        });
    });
});

import { shallowMount } from '@vue/test-utils';
import Input from 'inkline/components/Input';

describe('Components', () => {
    describe('Input', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Input, {
                methods: {
                    created: Input.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Input.name).toEqual('IInput');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 2)
            });

            it('should add "-prepended" class if "prepend" slot provided', () => {
                wrapper = shallowMount(Input, {
                    slots: {
                        prepend: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 2];

                expect(rule()).toEqual(expect.objectContaining({ '-prepended': true }));
            });

            it('should add "-appended" class if "append" slot provided', () => {
                wrapper = shallowMount(Input, {
                    slots: {
                        append: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 2];

                expect(rule()).toEqual(expect.objectContaining({ '-appended': true }));
            });

            it('should add "-prefixed" class if "prefix" slot provided', () => {
                wrapper = shallowMount(Input, {
                    slots: {
                        prefix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-prefixed': true }));
            });

            it('should add "-suffixed" class if "suffix" slot provided', () => {
                wrapper = shallowMount(Input, {
                    slots: {
                        suffix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-suffixed': true }));
            });
        });
    });
});

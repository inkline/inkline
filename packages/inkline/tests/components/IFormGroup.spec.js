import { shallowMount } from '@vue/test-utils';
import { IFormGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IFormGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IFormGroup, {
                methods: {
                    created: IFormGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(IFormGroup.name).toEqual('IFormGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('inline', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.inline).toBeDefined();
                    expect(wrapper.vm.inline).toEqual(false);
                });
            });

            describe('validate', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.validate).toBeDefined();
                    expect(wrapper.vm.validate).toEqual(true);
                });
            });
        });

        describe('data()', () => {
            describe('inputSchema', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('inputSchema');
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-inline" class if "inline" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-inline': false }));
                wrapper.setProps({ inline: true });
                expect(rule()).toEqual(expect.objectContaining({ '-inline': true }));
            });

            it('should add "-error" class if inputSchema is invalid', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-error': null }));
                wrapper.setData({ inputSchema: { invalid: true } });
                expect(rule()).toEqual(expect.objectContaining({ '-error': true }));
            });

            it('should add "-required" class if inputSchema validators contains required rule', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-required': null }));
                wrapper.setData({ inputSchema: { validators: [{ rule: 'required' }] } });
                expect(rule()).toEqual(expect.objectContaining({ '-required': true }));
            });
        });
    });
});

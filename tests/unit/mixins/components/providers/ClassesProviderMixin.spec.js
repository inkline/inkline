import { mount } from '@vue/test-utils'

import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('ClassesProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render () {},
                mixins: [
                    ClassesProviderMixin,
                ]
            });
        });

        describe('data', () => {
            describe('classesProvider', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.classesProvider).toBeDefined();
                    expect(wrapper.vm.classesProvider.constructor).toEqual(Array);
                });
            });
        });

        describe('methods', () => {
            describe('classesProvider.add()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.classesProvider.add).toBeDefined();
                });

                it('should add rule to classes provider', () => {
                    wrapper.vm.classesProvider.add(() => ({}));
                    expect(wrapper.vm.classesProvider.length).toEqual(1);
                });

                it('should set default rule type to "root"', () => {
                    wrapper.vm.classesProvider.add(() => ({}));
                    expect(wrapper.vm.classesProvider[0].type).toEqual('root');
                });

                it('should add typed rule to classes provider', () => {
                    wrapper.vm.classesProvider.add('name', () => ({}));
                    expect(wrapper.vm.classesProvider[0].type).toEqual('name');
                });
            });
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.classes).toBeDefined();
                    expect(wrapper.vm.classes).toEqual([]);
                });

                it('should evaluate added class rule', () => {
                    wrapper.vm.classesProvider.add(() => ({ 'class': true }));

                    expect(wrapper.vm.classes.length).toEqual(1);
                    expect(wrapper.vm.classes[0]).toHaveProperty('class');
                    expect(wrapper.vm.classes[0]['class']).toEqual(true);
                });

                it('should evaluate added class rules', () => {
                    wrapper.vm.classesProvider.add(() => ({ 'class1': true }));
                    wrapper.vm.classesProvider.add(() => ({ 'class2': false }));

                    expect(wrapper.vm.classes.length).toEqual(2);
                    expect(wrapper.vm.classes[0]).toEqual({ 'class1': true });
                    expect(wrapper.vm.classes[1]).toEqual({ 'class2': false });
                });

                it('should have rule types accessible', () => {
                    wrapper.vm.classesProvider.add('a', () => ({ 'a': true }));
                    wrapper.vm.classesProvider.add('b', () => ({ 'b': false }));

                    expect(wrapper.vm.classes.length).toEqual(2);
                    expect(wrapper.vm.classes[0]).toEqual({ 'a': true });
                    expect(wrapper.vm.classes[1]).toEqual({ 'b': false });
                    expect(wrapper.vm.classes['a']).toEqual([{ 'a': true }]);
                    expect(wrapper.vm.classes['b']).toEqual([{ 'b': false }]);
                });
            });
        });
    });
});

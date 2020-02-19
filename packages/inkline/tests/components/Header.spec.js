import { shallowMount } from '@vue/test-utils';
import Header from '@inkline/inkline/src/components/Header';

describe('Components', () => {
    describe('Header', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Header, {
                methods: {
                    created: Header.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Header.name).toEqual('IHeader');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('cover', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.cover).toBeDefined();
                    expect(wrapper.vm.cover).toEqual(true);
                });
            });

            describe('fluid', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fluid).toBeDefined();
                    expect(wrapper.vm.fluid).toEqual(false);
                });
            });

            describe('fullscreen', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fullscreen).toBeDefined();
                    expect(wrapper.vm.fullscreen).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-cover" class if "cover" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                wrapper.setProps({ cover: true });
                expect(rule()).toEqual(expect.objectContaining({ '-cover': true }));
            });

            it('should add "-fullscreen" class if "fullscreen" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-fullscreen': false }));
                wrapper.setProps({ fullscreen: true });
                expect(rule()).toEqual(expect.objectContaining({ '-fullscreen': true }));
            });
        });
    });
});

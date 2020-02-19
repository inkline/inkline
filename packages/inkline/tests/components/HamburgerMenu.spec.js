import { shallowMount } from '@vue/test-utils';
import HamburgerMenu from '@inkline/inkline/src/components/HamburgerMenu';


describe('Components', () => {
    describe('HamburgerMenu', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(HamburgerMenu, {
                methods: {
                    created: HamburgerMenu.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(HamburgerMenu.name).toEqual('IHamburgerMenu');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('active', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                    expect(wrapper.vm.active).toEqual(false);
                });
            });

            describe('animation', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.animation).toBeDefined();
                    expect(wrapper.vm.animation).toEqual('close');
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-active" class if "active" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-active': false }));
                wrapper.setProps({ active: true });
                expect(rule()).toEqual(expect.objectContaining({ '-active': true }));
            });

            it('should add "-close" class if "animation" property is "close"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-close': true }));
            });
        });
    });
});

import { shallowMount } from '@vue/test-utils';
import { IButton } from '@inkline/inkline/src/components';
import { RouterLink } from '../mocks/RouterLink';


describe('Components', () => {
    describe('IButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IButton, {
                methods: {
                    created: IButton.created
                },
                components: {
                    RouterLink
                }
            });
        });

        it('should be named correctly', () => {
            expect(IButton.name).toEqual('IButton');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('block', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.block).toBeDefined();
                    expect(wrapper.vm.block).toEqual(false);
                });
            });

            describe('circle', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.circle).toBeDefined();
                    expect(wrapper.vm.circle).toEqual(false);
                });
            });

            describe('link', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.link).toBeDefined();
                    expect(wrapper.vm.link).toEqual(false);
                });
            });

            describe('outline', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.outline).toBeDefined();
                    expect(wrapper.vm.outline).toEqual(false);
                });
            });

            describe('tag', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tag).toBeDefined();
                    expect(wrapper.vm.tag).toEqual('button');
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-block" class if "block" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-block': false }));
                wrapper.setProps({ block: true });
                expect(rule()).toEqual(expect.objectContaining({ '-block': true }));
            });

            it('should add "-circle" class if "circle" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-circle': false }));
                wrapper.setProps({ circle: true });
                expect(rule()).toEqual(expect.objectContaining({ '-circle': true }));
            });

            it('should add "-link" class if "link" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-link': false }));
                wrapper.setProps({ link: true });
                expect(rule()).toEqual(expect.objectContaining({ '-link': true }));
            });

            it('should add "-outline" class if "outline" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-outline': false }));
                wrapper.setProps({ outline: true });
                expect(rule()).toEqual(expect.objectContaining({ '-outline': true }));
            });

            it('should add attribute rules to attributes provider', () => {
                const attributeRulesLength = wrapper.vm.attributesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.attributesProvider.length).toEqual(attributeRulesLength + 1)
            });

            it('should add "aria-pressed" attribute if "active" property is true', () => {
                const rule = wrapper.vm.attributesProvider[wrapper.vm.attributesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ 'aria-pressed': false }));
                wrapper.setProps({ active: true });
                expect(rule()).toEqual(expect.objectContaining({ 'aria-pressed': 'true' }));
            });
        });
    });
});

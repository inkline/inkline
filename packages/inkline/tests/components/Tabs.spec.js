import { shallowMount } from '@vue/test-utils';
import Tabs from '@inkline/inkline/src/components/Tabs';
import Tab from '@inkline/inkline/src/components/Tab';

describe('Components', () => {
    describe('Tabs', () => {
        let wrapper, wrapperWithChildren;

        beforeEach(() => {
            wrapper = shallowMount(Tabs, {
                methods: {
                    created: Tabs.created,
                    mounted: Tabs.mounted
                }
            });

            wrapperWithChildren = shallowMount(Tabs, {
                stubs: {
                    Tab
                },
                slots: {
                    default: [
                        '<tab id="tab1" />',
                        '<tab id="tab2" />',
                        '<tab id="tab3" />'
                    ]
                }
            })
        });

        it('should be named correctly', () => {
            expect(Tabs.name).toEqual('ITabs');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('custom', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.custom).toBeDefined();
                    expect(wrapper.vm.custom).toEqual(false);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual('');
                });
            });

            describe('stretch', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.stretch).toBeDefined();
                    expect(wrapper.vm.stretch).toEqual(false);
                });
            });
        });

        describe('data', () => {
            describe('active', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                });
            });

            describe('tabs', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tabs).toBeDefined();
                    expect(wrapper.vm.tabs).toEqual([]);
                });
            });
        });

        describe('watch', () => {
            describe('value', () => {
                it('should set active item on change', (done) => {
                    expect(wrapper.vm.active).toEqual(null);

                    wrapper.setProps({ value: 'active' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.active).toEqual('active');
                        done();
                    });
                });
            });
        });

        describe('methods', () => {
            describe('onHeadingClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onHeadingClick).toBeDefined();
                });

                it('should add item to active items if not already active', () => {
                    expect(wrapper.vm.active).toEqual(null);

                    wrapper.vm.onHeadingClick({ id: 'active' });

                    expect(wrapper.vm.active).toEqual('active');
                });

                it('should emit input event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onHeadingClick({ id: 'active1' });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', 'active1');
                });
            });

            describe('initElements()', () => {
                beforeEach(() => {
                    wrapper.setData({ active: '', tabs: [] });
                    wrapperWithChildren.setData({ active: '', tabs: [] });
                });

                it('should be defined', () => {
                    expect(wrapper.vm.initElements).toBeDefined();
                });

                it('should set tabs to equal available ITab children', () => {
                    wrapper.vm.initElements();
                    wrapperWithChildren.vm.initElements();

                    expect(wrapper.vm.tabs.length).toEqual(0);
                    expect(wrapperWithChildren.vm.tabs.length).toEqual(3);
                });

                it('should return if no tabs available', () => {
                    wrapper.vm.initElements();

                    expect(wrapper.vm.active).toEqual('');
                });

                it('should return if active already set', () => {
                    wrapperWithChildren.setData({ active: 'tab2' });

                    wrapperWithChildren.vm.initElements();

                    expect(wrapperWithChildren.vm.active).not.toEqual('tab1');
                });

                it('should set active to first tab id', () => {
                    wrapperWithChildren.vm.initElements();

                    expect(wrapperWithChildren.vm.active).toEqual('tab1');
                });

                it('should emit input event with first tab id', () => {
                    const spy = jest.spyOn(wrapperWithChildren.vm, '$emit');

                    wrapperWithChildren.vm.initElements();

                    expect(spy).toHaveBeenCalledWith('input', 'tab1');
                });

                it('should set active to value if value provided', (done) => {
                    wrapperWithChildren.setProps({ value: 'tab2' });

                    wrapperWithChildren.vm.$nextTick(() => {
                        wrapperWithChildren.setData({ active: '' });
                        wrapperWithChildren.vm.initElements();

                        expect(wrapperWithChildren.vm.active).toEqual('tab2');
                        done();
                    });
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-custom" class if "custom" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-custom': false }));
                wrapper.setProps({ custom: true });
                expect(rule()).toEqual(expect.objectContaining({ '-custom': true }));
            });

            it('should add "-stretch" class if "custom" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-stretch': false }));
                wrapper.setProps({ stretch: true });
                expect(rule()).toEqual(expect.objectContaining({ '-stretch': true }));
            });
        });

        describe('mounted()', () => {
            it('should add init listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('init', wrapper.vm.initElements);
            });

            it('should call initElements', () => {
                const spy = jest.spyOn(wrapper.vm, 'initElements');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});

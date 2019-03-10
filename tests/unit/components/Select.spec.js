import { mount, shallowMount } from '@vue/test-utils';
import Select from '@inkline/inkline/src/components/Select';

describe('Components', () => {
    describe('Select', () => {
        let wrapper;
        let nativeWrapper;

        beforeEach(() => {
            wrapper = mount(Select, {
                attachToDocument: true,
                propsData: {
                    id: 'select',
                    'v-model': 'value'
                },
                methods: {
                    created: Select.created
                }
            });
            nativeWrapper = shallowMount(Select, {
                propsData: {
                    id: 'select'
                },
                mocks: {
                    $isMobile: true
                }
            });
        });

        it('should be named correctly', () => {
            expect(Select.name).toEqual('ISelect');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render native correctly', () => {
            expect(nativeWrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('filterable', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filterable).toBeDefined();
                    expect(wrapper.vm.filterable).toEqual(false);
                });
            });

            describe('native', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.native).toBeDefined();
                    expect(wrapper.vm.native).toEqual(false);
                });
            });
        });

        describe('data()', () => {
            describe('labelModel', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.labelModel).toBeDefined();
                    expect(wrapper.vm.labelModel).toEqual('');
                });
            });

            describe('options', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.options).toBeDefined();
                    expect(wrapper.vm.options).toEqual([]);
                });
            });
        });

        describe('methods', () => {
            describe('focusInputRef()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.focusInputRef).toBeDefined();
                });

                it('should focus <select> input if $isMobile', () => {
                    const spy = jest.spyOn(nativeWrapper.vm.$refs.select, 'focus');

                    nativeWrapper.vm.focusInputRef();

                    expect(spy).toHaveBeenCalled();
                });

                it('should focus <input> input if not $isMobile', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'focusInputRef');

                    wrapper.vm.focusInputRef();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('clickInputRef()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.clickInputRef).toBeDefined();
                });

                it('should click <select> input if $isMobile', () => {
                    const spy = jest.spyOn(nativeWrapper.vm.$refs.select, 'click');

                    nativeWrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });

                it('should click <input> input if not $isMobile', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.input, 'clickInputRef');

                    wrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });

                it('should call dropdown.show() if not $isMobile and dropdown is not visible', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.dropdown, 'show');

                    wrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-prefixed" class if "prefix" slot provided', () => {
                wrapper = shallowMount(Select, {
                    slots: {
                        prefix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-prefixed': true }));
            });

            it('should add "-suffixed" class if "suffix" slot provided', () => {
                wrapper = shallowMount(Select, {
                    slots: {
                        suffix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-suffixed': true }));
            });

            it('should listen to "option-click" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('option-click', expect.any(Function));
            });

            it('should set model to event option value on "option-click"', (done) => {
                wrapper.vm.$emit('option-click', { value: 'new' });

                wrapper.vm.$nextTick(() => {
                    expect(wrapper.emitted().input[0]).toEqual(['new']);
                    done();
                });
            });
        });

        describe('watch', () => {
            describe('model()', () => {
                it('should set label model to option value', () => {
                    wrapper.setData({
                        options: [
                            { value: 'label' }
                        ]
                    });

                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.setProps({ value: 'label' });

                    expect(wrapper.vm.labelModel).toEqual('label');
                });

                it('should set label model to option label if available', () => {
                    wrapper.setData({
                        options: [
                            { value: 'value', label: 'label' }
                        ]
                    });

                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.setProps({ value: 'value' });

                    expect(wrapper.vm.labelModel).toEqual('label');
                });
            });
        });
    });
});

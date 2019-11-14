import { mount, shallowMount } from '@vue/test-utils';
import Select from '@inkline/inkline/src/components/Select';
import { hashString } from '@inkline/inkline/src/helpers/hashString';

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
                    created: Select.created,
                    mounted: Select.mounted,
                    updated: Select.updated
                }
            });

            nativeWrapper = shallowMount(Select, {
                propsData: {
                    id: 'select'
                },
                data() {
                    return { isMobile: true }
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
            describe('setLabelModel()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.setLabelModel).toBeDefined();
                });

                it('should set label model to option value', () => {
                    wrapper.setData({
                        options: [
                            { id: 0, value: 'label' }
                        ]
                    });

                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.vm.setLabelModel('label');
                    expect(wrapper.vm.labelModel).toEqual('label');
                });

                it('should set label model to option label if available', () => {
                    wrapper.setData({
                        options: [
                            { id: 0, value: 'value', label: 'label' }
                        ]
                    });

                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.vm.setLabelModel('value');
                    expect(wrapper.vm.labelModel).toEqual('label');
                });

                it('should set label model to value if option not available', () => {
                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.vm.setLabelModel('label');
                    expect(wrapper.vm.labelModel).toEqual('label');
                });
            });

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
                    wrapper.vm.$refs.dropdown.visible = false;

                    wrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });

                it('should call dropdown.hide() if not $isMobile and dropdown not visible', () => {
                    const spy = jest.spyOn(wrapper.vm.$refs.dropdown, 'hide');
                    wrapper.vm.$refs.dropdown.visible = true;

                    wrapper.vm.clickInputRef();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('changeInputRef()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.changeInputRef).toBeDefined();
                });

                it('should emit input event with native event target value', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.changeInputRef({
                        target: {
                            value: 'model'
                        }
                    });

                    expect(spy).toHaveBeenCalledWith('input', 'model');
                });

                it('should emit input event with native event target value', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.changeInputRef({
                        target: {
                            value: 'model'
                        }
                    });

                    expect(spy).toHaveBeenCalledWith('input', 'model');
                });
            });


            describe('initElements()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.initElements).toBeDefined();
                });

                it('should set options if different options length', () => {
                    wrapper.vm.options = [{ id: 0 }];

                    wrapper.vm.initElements();

                    expect(wrapper.vm.options).toEqual([]);
                });

                it('should set options from ISelectOption children if same length and different ids', () => {
                    wrapper.vm.options = [{ id: 0 }];
                    wrapper.vm.$refs.dropdownMenu.$children = [
                        { value: 'abc', label: 'abc', $options: { name: 'ISelectOption' } }
                    ];

                    wrapper.vm.initElements();

                    expect(wrapper.vm.options[0]).toEqual(expect.objectContaining({
                        value: 'abc',
                        label: 'abc'
                    }));
                });

                it('should not set options from ISelectOption children if same length and same ids', () => {
                    const options = [{ id: hashString('abcabc') }];
                    wrapper.vm.options = [...options];
                    wrapper.vm.$refs.dropdownMenu.$children = [
                        { value: 'abc', label: 'abc', $options: { name: 'ISelectOption' } }
                    ];

                    wrapper.vm.initElements();

                    expect(wrapper.vm.options).toEqual(options);
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

        describe('mounted()', () => {
            it('should call initElements()', () => {
                const spy = jest.spyOn(wrapper.vm, 'initElements');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });

            it('should add listener to init event with initElements()', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalledWith('init', wrapper.vm.initElements);
            });

            it('should call setLabelModel() if value provided', () => {
                const spy = jest.spyOn(wrapper.vm, 'setLabelModel');
                wrapper.setProps({ value: 'value' });

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalledWith('value');
            });

            it('should not call setLabelModel() if value not provided', () => {
                const spy = jest.spyOn(wrapper.vm, 'setLabelModel');

                wrapper.vm.mounted();

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('updated()', () => {
            it('should call initElements()', () => {
                const spy = jest.spyOn(wrapper.vm, 'initElements');

                wrapper.vm.updated();

                expect(spy).toHaveBeenCalled();
            });
        });

        describe('watch', () => {
            describe('model()', () => {
                it('should call setLabelModel with changed value', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setLabelModel');

                    expect(wrapper.vm.labelModel).toEqual('');
                    wrapper.setProps({ value: 'label' });
                    expect(wrapper.vm.labelModel).toEqual('label');

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('label');
                });
            });
        });
    });
});

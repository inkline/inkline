import { shallowMount } from '@vue/test-utils';
import Tooltip from '@inkline/inkline/src/components/Tooltip';

describe('Components', () => {
    describe('Tooltip', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Tooltip, {
                propsData: {
                    id: 'tooltip'
                },
                methods: {
                    created: Tooltip.created,
                    mounted: Tooltip.mounted,
                    beforeDestroy: Tooltip.beforeDestroy
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        it('should be named correctly', () => {
            expect(Tooltip.name).toEqual('ITooltip');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('trigger', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.trigger).toBeDefined();
                    expect(wrapper.vm.trigger).toEqual('hover');
                });
            });

            describe('placement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.placement).toBeDefined();
                    expect(wrapper.vm.placement).toEqual('top');
                });
            });

            describe('arrow', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.arrow).toBeDefined();
                    expect(wrapper.vm.arrow).toEqual(true);
                });
            });

            describe('arrowOffset', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.arrowOffset).toBeDefined();
                    expect(wrapper.vm.arrowOffset).toEqual(0);
                });
            });
        });

        describe('data()', () => {
            describe('basename', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.basename).toBeDefined();
                    expect(wrapper.vm.basename).toEqual('tooltip');
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('tooltip');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(Tooltip, {
                        slots: {
                            default: ['<div/>']
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^tooltip-\w+/);
                });
            });
        });

        describe('methods', () => {
            describe('onUpdatePopper()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onUpdatePopper).toBeDefined();
                });

                it('should call updatePopper() if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setData({ visible: true });
                    wrapper.vm.onUpdatePopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not call updatePopper() if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setData({ visible: false });
                    wrapper.vm.onUpdatePopper();

                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });

        describe('created()', () => {
            it('should add updatePopper event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('updatePopper', wrapper.vm.onUpdatePopper);
            });
        });

        describe('mounted()', () => {
            it('should set reference element and current placement', () => {
                wrapper.vm.$el = 'new';

                wrapper.vm.mounted();

                expect(wrapper.vm.referenceElement).toEqual('new');
            });
        });

        describe('beforeDestroy()', () => {
            it('should remove updatePopper event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('updatePopper', wrapper.vm.onUpdatePopper);
            });
        });

        describe('watch', () => {
            describe('placement', () => {
                it('should set current placement to updated placement value', (done) => {
                    expect(wrapper.vm.currentPlacement).toEqual('top');
                    wrapper.setProps({ placement: 'new' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.currentPlacement).toEqual('new');
                        done();
                    });
                });
            });
        });
    });
});

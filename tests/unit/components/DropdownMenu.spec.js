import { shallowMount } from '@vue/test-utils';
import DropdownMenu from 'inkline/components/DropdownMenu';

describe('Components', () => {
    describe('DropdownMenu', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(DropdownMenu, {
                provide: {
                    dropdown: {
                        $el: {},
                        placement: 'bottom'
                    }
                },
                methods: {
                    created: DropdownMenu.created,
                    mounted: DropdownMenu.mounted
                }
            });
        });

        it('should be named correctly', () => {
            expect(DropdownMenu.name).toEqual('IDropdownMenu');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
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

        describe('created()', () => {
            it('should listen to "updatePopper" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('updatePopper', expect.any(Function));
            });

            it('should call updatePopper if visible', () => {
                const spy = jest.spyOn(wrapper.vm, 'updatePopper');
                wrapper.setData({ visible: true });

                wrapper.vm.$emit('updatePopper');

                expect(spy).toHaveBeenCalled();
            });

            it('should not call updatePopper if not visible', () => {
                const spy = jest.spyOn(wrapper.vm, 'updatePopper');
                wrapper.setData({ visible: false });

                wrapper.vm.$emit('updatePopper');

                expect(spy).not.toHaveBeenCalled();
            });

            it('should listen to "visibility-change" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('visibility-change', expect.any(Function));
            });

            it('should set visible to event value', () => {
                wrapper.vm.$emit('visibility-change', 'abc');

                expect(wrapper.vm.visible).toEqual('abc');
            });
        });

        describe('mounted()', () => {
            it('should initialize popup and reference elements and current placement', () => {
                wrapper.setData({
                    popupElement: null,
                    referenceElement: null,
                    currentPlacement: null,
                });

                wrapper.vm.mounted();

                expect(wrapper.vm.popupElement).not.toEqual(null);
                expect(wrapper.vm.referenceElement).not.toEqual(null);
                expect(wrapper.vm.currentPlacement).toEqual('bottom');
            });
        });
    });
});

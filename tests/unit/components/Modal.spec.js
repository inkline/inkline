import { shallowMount } from '@vue/test-utils';
import Modal from 'inkline/components/Modal';

describe('Components', () => {
    describe('Modal', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Modal, {
                propsData: {
                    id: 'modal'
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call hide() if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should call show() if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'show');
                    wrapper.setData({ visible: false });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not execute if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.onClick();

                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });
    });
});

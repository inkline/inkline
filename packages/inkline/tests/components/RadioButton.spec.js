import { shallowMount } from '@vue/test-utils';
import { IRadioButton } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IRadioButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IRadioButton);
        });

        it('should be named correctly', () => {
            expect(IRadioButton.name).toEqual('IRadioButton');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('data()', () => {
            describe('parentFormGroupName', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.parentFormGroupName).toBeDefined();
                    expect(wrapper.vm.parentFormGroupName).toEqual('IRadioButtonGroup');
                });
            });
        });
    });
});

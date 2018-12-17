import { shallowMount } from '@vue/test-utils';
import RadioButton from 'inkline/components/RadioButton';

describe('Components', () => {
    describe('RadioButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(RadioButton);
        });

        it('should be named correctly', () => {
            expect(RadioButton.name).toEqual('IRadioButton');
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

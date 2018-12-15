import { mount } from '@vue/test-utils';
import Radio from 'inkline/components/Radio';

describe('Components', () => {
    describe('Radio', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Radio);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        // it('should return value attribute if not grouped', () => {
        //     wrapper.vm.$attrs.value = 'value';
        //
        //     expect(wrapper.vm.currentValue).toEqual('value');
        // });
    });
});

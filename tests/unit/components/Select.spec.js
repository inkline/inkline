import { shallowMount } from '@vue/test-utils';
import Select from 'inkline/components/Select';

describe('Components', () => {
    describe('Select', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Select);
        });

        it('should be named correctly', () => {
            expect(Select.name).toEqual('ISelect');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

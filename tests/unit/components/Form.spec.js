import { shallowMount } from '@vue/test-utils';
import Form from 'inkline/components/Form';

describe('Components', () => {
    describe('Form', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Form);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

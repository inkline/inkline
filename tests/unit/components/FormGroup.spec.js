import { shallowMount } from '@vue/test-utils';
import FormGroup from 'inkline/components/FormGroup';

describe('Components', () => {
    describe('FormGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(FormGroup);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

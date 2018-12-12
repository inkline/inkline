import { mount } from '@vue/test-utils';
import FormLabel from 'inkline/components/FormLabel';

describe('Components', () => {
    describe('FormLabel', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(FormLabel);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

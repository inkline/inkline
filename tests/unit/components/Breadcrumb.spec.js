import { mount } from '@vue/test-utils';
import Breadcrumb from 'inkline/components/Breadcrumb';

describe('Components', () => {
    describe('Breadcrumb', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Breadcrumb);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

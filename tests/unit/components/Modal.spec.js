import { mount } from '@vue/test-utils';
import Modal from 'inkline/components/Modal';

describe('Components', () => {
    describe('Modal', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Modal);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

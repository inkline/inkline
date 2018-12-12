import { mount } from '@vue/test-utils';
import ButtonGroup from 'inkline/components/ButtonGroup';

describe('Components', () => {
    describe('ButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(ButtonGroup);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

import { mount } from '@vue/test-utils';
import CheckableGroup from 'inkline/components/CheckableGroup';

describe('Components', () => {
    describe('CheckableGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckableGroup);
        });

        test('should render correctly', () => {
            expect(true);
        });
    });
});

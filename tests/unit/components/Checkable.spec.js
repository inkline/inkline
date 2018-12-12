import { mount } from '@vue/test-utils';
import Checkable from 'inkline/components/Checkable';

describe('Components', () => {
    describe('Checkable', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Checkable);
        });

        test('should render correctly', () => {
            expect(true);
        });
    });
});

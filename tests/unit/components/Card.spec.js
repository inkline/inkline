import { shallowMount } from '@vue/test-utils';
import Card from '@inkline/inkline/components/Card';

describe('Components', () => {
    describe('Card', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Card);
        });

        it('should be named correctly', () => {
            expect(Card.name).toEqual('ICard');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

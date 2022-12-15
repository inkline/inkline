import { shallowMount } from '@vue/test-utils';
import { ICard } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICard', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICard);
        });

        it('should be named correctly', () => {
            expect(ICard.name).toEqual('ICard');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

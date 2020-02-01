import { shallowMount } from '@vue/test-utils'
import IndexView from '@/pages/index.vue';

describe('IndexView', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(IndexView);
    });

    it('is should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});

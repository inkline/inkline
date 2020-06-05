import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import IndexView from '@/pages/index.vue';

describe('IndexView', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(IndexView, {
            stubs: {
                NuxtLink: RouterLinkStub
            }
        });
    });

    it('is should render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});

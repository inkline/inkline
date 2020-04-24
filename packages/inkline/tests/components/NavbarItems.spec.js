import { shallowMount } from '@vue/test-utils';
import { INavbarItems } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INavbarItems', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(INavbarItems, {
                provide: {
                    collapsible: {
                        collapsed: false,
                        collapse: 'md'
                    }
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

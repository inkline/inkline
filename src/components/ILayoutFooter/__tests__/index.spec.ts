import { render } from '@testing-library/vue';
import { ILayoutFooter } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILayoutFooter', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutFooter.name).toEqual('ILayoutFooter');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutFooter, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

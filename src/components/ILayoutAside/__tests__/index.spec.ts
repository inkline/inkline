import { render } from '@testing-library/vue';
import { ILayoutAside } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILayoutAside', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutAside.name).toEqual('ILayoutAside');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutAside, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

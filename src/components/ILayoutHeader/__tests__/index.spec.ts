import { render } from '@testing-library/vue';
import { ILayoutHeader } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILayoutHeader', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutHeader.name).toEqual('ILayoutHeader');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutHeader, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

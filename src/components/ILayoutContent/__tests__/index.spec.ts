import { render } from '@testing-library/vue';
import { ILayoutContent } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ILayoutContent', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutContent.name).toEqual('ILayoutContent');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutContent, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

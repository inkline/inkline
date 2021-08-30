import { render } from '@testing-library/vue';
import { IIcon } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IIcon', () => {
        const props = {
            size: 'md',
            icon: 'ink-plus'
        };

        it('should be named correctly', () => {
            expect(IIcon.name).toEqual('IIcon');
        });

        it('should render correctly', () => {
            const wrapper = render(IIcon, {
                props
            });
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

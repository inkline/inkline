import { render } from '@testing-library/vue';
import { IMedia } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IMedia', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IMedia.name).toEqual('IMedia');
        });

        it('should render correctly', () => {
            const wrapper = render(IMedia, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

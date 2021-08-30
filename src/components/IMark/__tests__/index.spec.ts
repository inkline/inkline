import { render } from '@testing-library/vue';
import { IMark } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IMark', () => {
        const props = {
            text: 'The quick brown fox jumps over the lazy dog',
            query: 'fox'
        };

        it('should be named correctly', () => {
            expect(IMark.name).toEqual('IMark');
        });

        it('should render correctly', () => {
            const wrapper = render(IMark, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

import { render } from '@testing-library/vue';
import { IMark } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

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
            const wrapper = render(IMark, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

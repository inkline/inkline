import { render } from '@testing-library/vue';
import { IMedia } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

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
            const wrapper = render(IMedia, {
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

import { render } from '@testing-library/vue';
import { ILayoutFooter } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('ILayoutFooter', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutFooter.name).toEqual('ILayoutFooter');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutFooter, {
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

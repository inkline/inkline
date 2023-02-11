import { render } from '@testing-library/vue';
import { ILayoutHeader } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ILayoutHeader', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutHeader.name).toEqual('ILayoutHeader');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutHeader, {
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

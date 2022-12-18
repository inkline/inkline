import { render } from '@testing-library/vue';
import { ILayoutAside } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('ILayoutAside', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutAside.name).toEqual('ILayoutAside');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutAside, {
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

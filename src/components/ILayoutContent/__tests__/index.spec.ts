import { render } from '@testing-library/vue';
import { ILayoutContent } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('ILayoutContent', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayoutContent.name).toEqual('ILayoutContent');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayoutContent, {
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

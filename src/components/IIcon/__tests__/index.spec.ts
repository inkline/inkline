import { render } from '@testing-library/vue';
import { IIcon } from '@inkline/inkline/components';
import { InklineIconsKey, InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

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
                props,
                global: {
                    provide: {
                        [InklineIconsKey as symbol]: {
                            inkPlus: {}
                        },
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

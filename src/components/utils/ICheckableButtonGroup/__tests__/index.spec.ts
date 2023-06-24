import { render } from '@testing-library/vue';
import { ICheckableButtonGroup } from '@inkline/inkline/components/utils';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ICheckableButtonGroup', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        const slots = {
            default: [
                '<i-button>Apple</i-button>',
                '<i-button>Watermelon</i-button>',
                '<i-button>Peach</i-button>',
                '<i-button>Mango</i-button>'
            ]
        };

        it('should be named correctly', () => {
            expect(ICheckableButtonGroup.name).toEqual('ICheckableButtonGroup');
        });

        it('should render correctly', () => {
            const wrapper = render(ICheckableButtonGroup, {
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props,
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

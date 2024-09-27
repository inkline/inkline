import { render } from '@testing-library/vue';
import { ICheckableButtonGroup, IButton, InklineKey } from '@inkline/inkline';
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

        const stubs = {
            IButton
        };

        it('should be named correctly', () => {
            expect(ICheckableButtonGroup.name).toEqual('ICheckableButtonGroup');
        });

        it('should render correctly as checkbox', () => {
            const wrapper = render(ICheckableButtonGroup, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props: {
                    ...props,
                    type: 'checkbox'
                },
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });

        it('should render correctly as radio', () => {
            const wrapper = render(ICheckableButtonGroup, {
                global: {
                    stubs,
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                },
                props: {
                    ...props,
                    type: 'radio'
                },
                slots
            });
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

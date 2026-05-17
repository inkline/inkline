import { render } from '@testing-library/vue';
import { CheckableButtonGroup, Button } from '@inkline/inkline';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('CheckableButtonGroup', () => {
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
            Button
        };

        it('should be named correctly', () => {
            expect(CheckableButtonGroup.name).toEqual('CheckableButtonGroup');
        });

        it('should render correctly as checkbox', () => {
            const wrapper = render(CheckableButtonGroup, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
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
            const wrapper = render(CheckableButtonGroup, {
                global: {
                    stubs,
                    provide: {
                        ...createTestingInklineOptionsProvide()
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

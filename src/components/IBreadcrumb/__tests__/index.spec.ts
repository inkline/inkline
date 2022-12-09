import { render } from '@testing-library/vue';
import { IBreadcrumb } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__mocks__';

describe('Components', () => {
    describe('IBreadcrumb', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IBreadcrumb.name).toEqual('IBreadcrumb');
        });

        it('should render correctly', () => {
            const wrapper = render(IBreadcrumb, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(IBreadcrumb, {
                        props,
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`
                    );
                });
            });
        });
    });
});

import { render } from '@testing-library/vue';
import { ILayout } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ILayout', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(ILayout.name).toEqual('ILayout');
        });

        it('should render correctly', () => {
            const wrapper = render(ILayout, {
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
                    const wrapper = render(ILayout, {
                        props: {
                            vertical: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass('-vertical');
                });
            });
        });
    });
});

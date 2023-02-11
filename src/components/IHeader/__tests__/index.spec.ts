import { render } from '@testing-library/vue';
import { IHeader } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IHeader', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IHeader.name).toEqual('IHeader');
        });

        it('should render correctly', () => {
            const wrapper = render(IHeader, {
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
                    const wrapper = render(IHeader, {
                        props: {
                            cover: true,
                            fullscreen: true,
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        `-${props.color}`,
                        `-${props.size}`,
                        '-cover',
                        '-fullscreen'
                    );
                });
            });
        });
    });
});

import { render } from '@testing-library/vue';
import { ICard } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ICard', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ICard.name).toEqual('ICard');
        });

        it('should render correctly', () => {
            const wrapper = render(ICard, {
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
                    const wrapper = render(ICard, {
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

        describe('tag', () => {
            it('should render card using article tag', () => {
                const wrapper = render(ICard, {
                    props: {
                        ...props,
                        tag: 'article'
                    },
                    global: {
                        provide: {
                            [InklineKey as symbol]: createInkline()
                        }
                    }
                });

                expect(wrapper.container.firstChild!.nodeName).toBe('ARTICLE');
            });
        });
    });
});

import { render } from '@testing-library/vue';
import { IFormLabel } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('IFormLabel', () => {
        const props = {
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IFormLabel.name).toEqual('IFormLabel');
        });

        it('should render correctly', () => {
            const wrapper = render(IFormLabel, {
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
                    const wrapper = render(IFormLabel, {
                        props: {
                            placement: 'left',
                            ...props
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(`-${props.size}`, '-left');
                });
            });

            describe('forAttr', () => {
                it('should be equal to props.for', () => {
                    const value = 'example';
                    const wrapper = render(IFormLabel, {
                        props: {
                            for: value
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveAttribute('for', value);
                });
            });
        });
    });
});

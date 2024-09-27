import { render } from '@testing-library/vue';
import { ITable } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/constants';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('ITable', () => {
        const props = {
            color: 'light'
        };

        it('should be named correctly', () => {
            expect(ITable.name).toEqual('ITable');
        });

        it('should render correctly', () => {
            const wrapper = render(ITable, {
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
                    const wrapper = render(ITable, {
                        props: {
                            ...props,
                            bordered: true,
                            condensed: true,
                            striped: true,
                            hoverable: true,
                            nowrap: true,
                            responsive: true
                        },
                        global: {
                            provide: {
                                [InklineKey as symbol]: createInkline()
                            }
                        }
                    });

                    expect(wrapper.container.firstChild).toHaveClass(
                        '-light',
                        '-bordered',
                        '-condensed',
                        '-striped',
                        '-hoverable',
                        '-nowrap',
                        '-responsive'
                    );
                });
            });
        });
    });
});

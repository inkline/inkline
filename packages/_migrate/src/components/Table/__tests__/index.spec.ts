import { render } from '@testing-library/vue';
import { Table } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Table', () => {
        const props = {
            color: 'light'
        };

        it('should be named correctly', () => {
            expect(Table.name).toEqual('Table');
        });

        it('should render correctly', () => {
            const wrapper = render(Table, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should add classes based on props', () => {
                    const wrapper = render(Table, {
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
                                ...createTestingInklineOptionsProvide()
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

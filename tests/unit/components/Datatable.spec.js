import { shallowMount } from '@vue/test-utils';
import Datatable from '@inkline/inkline/src/components/Datatable';
import {countColumn, idColumn} from "../../../src/components/Datatable/script";

const columns = [
    { title: 'Name', path: 'name' }
];

const rows = [
    { id: '1', name: 'John Doe', age: 25 },
    { id: '2', name: 'Johanna Doe', age: 28 },
    { id: '3', name: 'Bob Doe', age: 32 }
];

describe('Components', () => {
    describe('Datatable', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Datatable, {
                methods: {
                    created: Datatable.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Datatable.name).toEqual('IDatatable');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('async', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.async).toBeDefined();
                    expect(wrapper.vm.async).toEqual(false);
                });
            });

            describe('columns', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.columns).toBeDefined();
                    expect(wrapper.vm.columns).toEqual([]);
                });
            });

            describe('countColumn', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.countColumn).toBeDefined();
                    expect(wrapper.vm.countColumn).toEqual({});
                });
            });

            describe('expandColumn', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.expandColumn).toBeDefined();
                    expect(wrapper.vm.expandColumn).toEqual({});
                });
            });

            describe('rows', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.rows).toBeDefined();
                    expect(wrapper.vm.rows).toEqual([]);
                });
            });

            describe('rowsCount', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.rowsCount).toBeDefined();
                    expect(wrapper.vm.rowsCount).toEqual(null);
                });
            });

            describe('defaultSortKey', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.defaultSortKey).toBeDefined();
                    expect(wrapper.vm.defaultSortKey).toEqual('#');
                });
            });

            describe('filtering', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filtering).toBeDefined();
                    expect(wrapper.vm.filtering).toEqual(true);
                });
            });

            describe('pagination', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.pagination).toBeDefined();
                    expect(wrapper.vm.pagination).toEqual(true);
                });
            });

            describe('footer', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.footer).toBeDefined();
                    expect(wrapper.vm.footer).toEqual(true);
                });
            });

            describe('singleExpand', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.singleExpand).toBeDefined();
                    expect(wrapper.vm.singleExpand).toEqual(false);
                });
            });

            describe('i18n', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.i18n).toBeDefined();
                    expect(wrapper.vm.i18n).toEqual({});
                });
            });
        });

        describe('data()', () => {
            describe('sortBy', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.sortBy).toBeDefined();
                    expect(wrapper.vm.sortBy).toEqual('#');
                });
            });

            describe('sortDirection', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.sortDirection).toBeDefined();
                    expect(wrapper.vm.sortDirection).toEqual('asc');
                });
            });

            describe('rowsPerPage', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.rowsPerPage).toBeDefined();
                    expect(wrapper.vm.rowsPerPage).toEqual(10);
                });
            });

            describe('page', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.page).toBeDefined();
                    expect(wrapper.vm.page).toEqual(0);
                });
            });

            describe('search', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.search).toBeDefined();
                    expect(wrapper.vm.search).toEqual('');
                });
            });

            describe('expanded', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.expanded).toBeDefined();
                    expect(wrapper.vm.expanded).toEqual({});
                });
            });
        });

        describe('methods', () => {
            describe('onHeaderCellClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onHeaderCellClick).toBeDefined();
                });

                it('should not do anything if column is not sortable', () => {
                    const sortBy = wrapper.vm.sortBy;
                    const sortDirection = wrapper.vm.sortDirection;
                    const column = columns[0];

                    wrapper.vm.onHeaderCellClick(column);

                    expect(wrapper.vm.sortBy).toEqual(sortBy);
                    expect(wrapper.vm.sortDirection).toEqual(sortDirection);
                });

                it('should sort rows by column key in ascending order', () => {
                    const column = { ...columns[0], sortable: true };

                    wrapper.vm.onHeaderCellClick(column);

                    expect(wrapper.vm.sortBy).toEqual(columns[0].path);
                    expect(wrapper.vm.sortDirection).toEqual('asc');
                });

                it('should sort rows by column key in descending order on second call', () => {
                    const column = { ...columns[0], sortable: true };

                    wrapper.vm.onHeaderCellClick(column);
                    wrapper.vm.onHeaderCellClick(column);

                    expect(wrapper.vm.sortBy).toEqual(columns[0].path);
                    expect(wrapper.vm.sortDirection).toEqual('desc');
                });
            });

            describe('renderColumns()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.renderColumns).toBeDefined();
                });

                it('should return rendered columns as column title', () => {
                    const column = { ...columns[0] };
                    const renderedColumns = wrapper.vm.renderColumns([column]);

                    expect(renderedColumns).toEqual({ [column.path]: column.title });
                });

                it('should return rendered columns as column renderMethod call', () => {
                    const renderHeader = (column) => column.title;
                    const column = { ...columns[0], renderHeader};
                    const renderedColumns = wrapper.vm.renderColumns([column], 'renderHeader');

                    expect(renderedColumns).toEqual({ [column.path]: renderHeader(column) });
                });
            });

            describe('columnClass()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.columnClass).toBeDefined();
                });

                it('should return column class with default alignment', () => {
                    const column = { ...columns[0] };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toEqual(['-align-left']);
                });

                it('should return column class with right alignment', () => {
                    const column = { ...columns[0], align: 'right' };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toEqual(['-align-right']);
                });

                it('should return sortable column class', () => {
                    const column = { ...columns[0], sortable: true };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toContain('-sortable');
                });

                it('should not return sortable column class if row specified', () => {
                    const column = { ...columns[0], sortable: true };
                    const row = {};
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).not.toContain('-sortable');
                });

                it('should return sticky column class', () => {
                    const column = { ...columns[0], sticky: true };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toContain('-sticky');
                });

                it('should return concatenated column classes string', () => {
                    const column = { ...columns[0], classes: 'class' };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toContain('class');
                });

                it('should return concatenated column classes array', () => {
                    const column = { ...columns[0], classes: ['class'] };
                    const row = undefined;
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toContain('class');
                });

                it('should return added row column class', () => {
                    const column = { ...columns[0] };
                    const row = { config: { columnClass: { name: 'class' }}};
                    const columnClasses = wrapper.vm.columnClass(column, row);

                    expect(columnClasses).toContain('class');
                });
            });

            describe('columnStyle()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.columnStyle).toBeDefined();
                });

                it('should return false if column style not specified', () => {
                    const column = { ...columns[0] };
                    const row = undefined;
                    const columnStyle = wrapper.vm.columnStyle(column, row);

                    expect(columnStyle).toEqual(false);
                });

                it('should return style object if column style specified', () => {
                    const column = { ...columns[0], style: { padding: '10px' } };
                    const row = undefined;
                    const columnStyle = wrapper.vm.columnStyle(column, row);

                    expect(columnStyle).toEqual({ padding: '10px' });
                });

                it('should return style object if column style specified and row style not specified', () => {
                    const column = { ...columns[0], style: { padding: '10px' } };
                    const row = {};
                    const columnStyle = wrapper.vm.columnStyle(column, row);

                    expect(columnStyle).toEqual({ padding: '10px' });
                });

                it('should return style object if column style and row style specified', () => {
                    const column = { ...columns[0], style: { padding: '10px' } };
                    const row = { style: { margin: '15px' } };
                    const columnStyle = wrapper.vm.columnStyle(column, row);

                    expect(columnStyle).toEqual({ padding: '10px', margin: '15px' });
                });
            });

            describe('rowClass()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.rowClass).toBeDefined();
                });

                it('should return empty array if row not provided', () => {
                    const row = null;
                    const rowClass = wrapper.vm.rowClass(row);

                    expect(rowClass).toEqual([]);
                });

                it('should return empty array if row config not provided', () => {
                    const row = {};
                    const rowClass = wrapper.vm.rowClass(row);

                    expect(rowClass).toEqual([]);
                });

                it('should return empty array if row config rowClass not provided', () => {
                    const row = { config: {} };
                    const rowClass = wrapper.vm.rowClass(row);

                    expect(rowClass).toEqual([]);
                });

                it('should return array with appended rowClass if rowClass is string', () => {
                    const row = { config: { rowClass: 'class' } };
                    const rowClass = wrapper.vm.rowClass(row);

                    expect(rowClass).toEqual(['class']);
                });

                it('should return array with concatenated rowClass if rowClass is array', () => {
                    const row = { config: { rowClass: ['class'] } };
                    const rowClass = wrapper.vm.rowClass(row);

                    expect(rowClass).toEqual(['class']);
                });
            });

            describe('addIdColumn()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.addIdColumn).toBeDefined();
                });

                it('should add id column to start of array', () => {
                    const newColumns = wrapper.vm.addIdColumn([ ...columns ]);

                    expect(newColumns[0]).toEqual(idColumn);
                });
            });

            describe('addCountColumn()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.addCountColumn).toBeDefined();
                });

                it('should add count column to start of array', () => {
                    const newColumns = wrapper.vm.addCountColumn([ ...columns ]);

                    expect(newColumns[0].path).toEqual('#');
                });

                it('should add extended count column to start of array', () => {
                    wrapper.setProps({ countColumn: { title: 'Count' } });

                    const newColumns = wrapper.vm.addCountColumn([ ...columns ]);

                    expect(newColumns[0].path).toEqual('#');
                    expect(newColumns[0].title).toEqual('Count');
                });

                it('should not add count column if countColumn is false', () => {
                    wrapper.setProps({ countColumn: false });

                    const newColumns = wrapper.vm.addCountColumn([]);

                    expect(newColumns).toEqual([]);
                });
            });

            describe('addExpandColumn()', () => {
                let expandWrapper;

                beforeEach(() => {
                    expandWrapper = shallowMount(Datatable, {
                        slots: {
                            expand: '<div/>'
                        }
                    });
                });

                it('should be defined', () => {
                    expect(wrapper.vm.addExpandColumn).toBeDefined();
                });

                it('should not add expand column if table doesn\'t have expandable rows', () => {
                    const newColumns = wrapper.vm.addExpandColumn([]);

                    expect(newColumns).toEqual([]);
                });

                it('should add expand column to end of array', () => {
                    const newColumns = expandWrapper.vm.addExpandColumn([]);

                    expect(newColumns[0].path).toEqual('^');
                });

                it('should add extended expand column to end of array', () => {
                    expandWrapper.setProps({ expandColumn: { title: 'Expand' } });

                    const newColumns = expandWrapper.vm.addExpandColumn([]);

                    expect(newColumns[0].path).toEqual('^');
                    expect(newColumns[0].title).toEqual('Expand');
                });

                it('should not add expand column if expandColumn is false', () => {
                    expandWrapper.setProps({ expandColumn: false });

                    const newColumns = wrapper.vm.addExpandColumn([]);

                    expect(newColumns).toEqual([]);
                });
            });

            describe('filterColumns()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filterColumns).toBeDefined();
                });

                it('should filter out columns that have hidden set', () => {
                    const newColumns = wrapper.vm.filterColumns([
                        { ...columns[0] },
                        { ...columns[0], hidden: true }
                    ]);

                    expect(newColumns.length).toEqual(1);
                });
            });

            describe('renderRows()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.renderRows).toBeDefined();
                });

                it('should filter out columns that have hidden set', () => {
                    const newColumns = wrapper.vm.filterColumns([
                        { ...columns[0] },
                        { ...columns[0], hidden: true }
                    ]);

                    expect(newColumns.length).toEqual(1);
                });
            });
        });
    });
});

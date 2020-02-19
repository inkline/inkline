import { shallowMount } from '@vue/test-utils';
import Datatable from '@inkline/inkline/src/components/Datatable';
import {defaults as defaultConfig, countColumn, idColumn} from "@inkline/inkline/src/components/Datatable/script";

const columns = [
    { title: 'Name', path: 'name' },
    { title: 'Age', path: 'age' }
];

const rows = [
    { id: '1', name: 'John Doe', age: 25 },
    { id: '2', name: 'Johanna Doe', age: 24 },
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
                    expect(wrapper.vm.page).toEqual(1);
                });
            });

            describe('filter', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filter).toBeDefined();
                    expect(wrapper.vm.filter).toEqual('');
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

                it('should sort rows by column key in ascending order if order is descending', () => {
                    const column = { ...columns[0], sortable: true };

                    wrapper.vm.onHeaderCellClick(column);
                    wrapper.vm.onHeaderCellClick(column);
                    wrapper.vm.onHeaderCellClick(column);

                    expect(wrapper.vm.sortBy).toEqual(columns[0].path);
                    expect(wrapper.vm.sortDirection).toEqual('asc');
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
                    const row = { config: { style: { margin: '15px' } } };
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

                    expect(newColumns[0].path).toEqual(countColumn.path);
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

                it('should return rendered rows as column path value', () => {
                    const rowsToRender = [{ ...rows[0] }, { ...rows[1] }, { ...rows[2] }];
                    const column = { ...columns[0] };

                    wrapper.setProps({ columns: [column] });

                    const renderedRows = wrapper.vm.renderRows(rowsToRender);

                    expect(renderedRows.length).toEqual(3);
                    expect(renderedRows[0]).toEqual(expect.objectContaining({
                        id: '1',
                        indexRef: 0,
                        name: 'John Doe'
                    }));
                });

                it('should return rendered rows as column render function call', () => {
                    const rowsToRender = [{ ...rows[0] }, { ...rows[1] }, { ...rows[2] }];
                    const column = { ...columns[0], render: (row, column) => row[column.path].toUpperCase() };

                    wrapper.setProps({ columns: [column] });

                    const renderedRows = wrapper.vm.renderRows(rowsToRender);

                    expect(renderedRows.length).toEqual(3);
                    expect(renderedRows[0]).toEqual(expect.objectContaining({
                        id: '1',
                        indexRef: 0,
                        name: column.render(rows[0], columns[0])
                    }));
                });
            });

            describe('sortRows()', () => {
                let rowsToSort;

                beforeEach(() => {
                    rowsToSort = [{ ...rows[0] }, { ...rows[1] }, { ...rows[2] }];
                });

                it('should be defined', () => {
                    expect(wrapper.vm.sortRows).toBeDefined();
                });

                it('should not sort if sort column not found', () => {

                    wrapper.setData({ sortBy: 'unknown' });

                    const sortedRows = wrapper.vm.sortRows(rowsToSort);

                    expect(sortedRows.length).toEqual(3);
                    expect(sortedRows).toEqual(rowsToSort);
                });

                it('should sort by value found at column path in ascending order', () => {
                    const column = { ...columns[1] };

                    wrapper.setProps({ columns: [column] });
                    wrapper.setData({ sortBy: column.path });

                    const sortedRows = wrapper.vm.sortRows(rowsToSort);

                    expect(sortedRows.length).toEqual(3);
                    expect(sortedRows[0]).toEqual(rows[1]);
                });

                it('should sort by value found at column path in descending order', () => {
                    const column = { ...columns[1] };

                    wrapper.setProps({ columns: [column] });
                    wrapper.setData({ sortBy: column.path, sortDirection: 'desc' });

                    const sortedRows = wrapper.vm.sortRows(rowsToSort);

                    expect(sortedRows.length).toEqual(3);
                    expect(sortedRows[0]).toEqual(rows[2]);
                });

                it('should sort by custom sort function', () => {
                    const column = { ...columns[1],
                        sortFn: (a, b) => {
                            if (a.age < b.age) return 1;
                            if (b.age < a.age) return -1;

                            return 0;
                        }
                    };

                    wrapper.setProps({ columns: [column] });
                    wrapper.setData({ sortBy: column.path });

                    const sortedRows = wrapper.vm.sortRows(rowsToSort);

                    expect(sortedRows.length).toEqual(3);
                    expect(sortedRows[0]).toEqual(rows[2]);
                });
            });

            describe('filterRows()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filterRows).toBeDefined();
                });

                it('should not filter if filter string is empty', () => {
                    wrapper.setProps({ columns });
                    wrapper.setData({ filter: '' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(3);
                    expect(filteredRows).toEqual(rows);
                });

                it('should not filter if async is enabled', () => {
                    wrapper.setProps({ columns, async: true });
                    wrapper.setData({ filter: 'John' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(3);
                    expect(filteredRows).toEqual(rows);
                });

                it('should not filter if filtering is disabled', () => {
                    wrapper.setProps({ columns, filtering: false });
                    wrapper.setData({ filter: 'John' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(3);
                    expect(filteredRows).toEqual(rows);
                });

                it('should filter rows by filter string', () => {
                    wrapper.setProps({ columns });
                    wrapper.setData({ filter: 'Johanna' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(1);
                    expect(filteredRows[0]).toEqual(rows[1]);
                });

                it('should filter rows by filter string using fuzzy filter', () => {
                    wrapper.setProps({ columns });
                    wrapper.setData({ filter: 'John' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(2);
                    expect(filteredRows[0]).toEqual(rows[0]);
                    expect(filteredRows[1]).toEqual(rows[1]);
                });

                it('should filter rows by filter string on any column', () => {
                    wrapper.setProps({ columns });
                    wrapper.setData({ filter: '25' });

                    const filteredRows = wrapper.vm.filterRows(rows);

                    expect(filteredRows.length).toEqual(1);
                    expect(filteredRows[0]).toEqual(rows[0]);
                });
            });

            describe('paginateRows()', () => {
                let rowsToPaginate;

                beforeEach(() => {
                    rowsToPaginate = [...rows, ...rows, ...rows, ...rows];
                });

                it('should be defined', () => {
                    expect(wrapper.vm.paginateRows).toBeDefined();
                });

                it('should not paginate if pagination is disabled', () => {
                    wrapper.setProps({ rowsLength: rowsToPaginate.length, pagination: false });
                    wrapper.setData({ page: 1, rowsPerPage: 10 });

                    const paginatedRows = wrapper.vm.paginateRows(rowsToPaginate);

                    expect(paginatedRows.length).toEqual(rowsToPaginate.length);
                });

                it('should not paginate if async is enabled', () => {
                    wrapper.setProps({ rowsLength: rowsToPaginate.length, async: true });
                    wrapper.setData({ page: 1, rowsPerPage: 10 });

                    const paginatedRows = wrapper.vm.paginateRows(rowsToPaginate);

                    expect(paginatedRows.length).toEqual(rowsToPaginate.length);
                });

                it('should paginate rows for first page', () => {
                    const rowsPerPage = 10;
                    const page = 1;

                    wrapper.setProps({ rowsCount: rowsToPaginate.length });
                    wrapper.setData({ page, rowsPerPage });

                    const paginatedRows = wrapper.vm.paginateRows(rowsToPaginate);

                    expect(paginatedRows.length).toEqual(rowsPerPage);
                    expect(paginatedRows[0]).toEqual(rowsToPaginate[0]);
                });

                it('should paginate rows for last page', () => {
                    const rowsPerPage = 10;
                    const page = 2;

                    wrapper.setProps({ rowsCount: rowsToPaginate.length });
                    wrapper.setData({ page, rowsPerPage });

                    const paginatedRows = wrapper.vm.paginateRows(rowsToPaginate);

                    expect(paginatedRows.length).toEqual(rowsToPaginate.length - rowsPerPage);
                    expect(paginatedRows[paginatedRows.length - 1]).toEqual(rowsToPaginate[rowsToPaginate.length - 1]);
                });
            });

            describe('getConfig()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.getConfig).toBeDefined();
                });

                it('should return defaults for given key if true value', () => {
                    wrapper.setProps({ pagination: true });

                    expect(wrapper.vm.getConfig('pagination')).toEqual(defaultConfig.pagination);
                });

                it('should return extended defaults for given key if object value', () => {
                    wrapper.setProps({ pagination: { size: 'lg' } });

                    expect(wrapper.vm.getConfig('pagination').size).toEqual('lg');
                });
            });

            describe('emitUpdate()', () => {
                const dataValues = { page: 1, rowsPerPage: 10, filter: '123' };

                it('should be defined', () => {
                    expect(wrapper.vm.emitUpdate).toBeDefined();
                });

                it('should return object containing page, rowsPerPage and filter', () => {
                    wrapper.setData(dataValues);

                    wrapper.vm.emitUpdate();

                    expect(wrapper.emitted().update[1][0]).toEqual({ page: 1, rowsPerPage: 10, filter: '123' });
                });

                it('should return object containing event object overwritten values', () => {
                    wrapper.setData(dataValues);

                    wrapper.vm.emitUpdate({ page: 2, rowsPerPage: 15, filter: '12345' });

                    expect(wrapper.emitted().update[1][0]).toEqual({ page: 2, rowsPerPage: 15, filter: '12345' });
                });
            });

            describe('onClickExpand()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClickExpand).toBeDefined();
                });

                it('should set rowId expanded to true', () => {
                    wrapper.vm.onClickExpand('rowId');

                    expect(wrapper.vm.expanded.rowId).toBeDefined();
                    expect(wrapper.vm.expanded.rowId).toEqual(true);
                });

                it('should set multiple rowIds expanded to true', () => {
                    wrapper.vm.onClickExpand('rowId1');
                    expect(wrapper.vm.expanded.rowId1).toBeDefined();
                    expect(wrapper.vm.expanded.rowId1).toEqual(true);

                    wrapper.vm.onClickExpand('rowId2');
                    expect(wrapper.vm.expanded.rowId2).toBeDefined();
                    expect(wrapper.vm.expanded.rowId2).toEqual(true);
                });

                it('should set rowId expanded to false if already expanded', () => {
                    wrapper.vm.onClickExpand('rowId');
                    wrapper.vm.onClickExpand('rowId');

                    expect(wrapper.vm.expanded.rowId).toBeDefined();
                    expect(wrapper.vm.expanded.rowId).toEqual(false);
                });

                it('should set rowId expanded to true if singleExpand', () => {
                    wrapper.setProps({ singleExpand: true });

                    wrapper.vm.onClickExpand('rowId');

                    expect(wrapper.vm.expanded.rowId).toBeDefined();
                    expect(wrapper.vm.expanded.rowId).toEqual(true);
                    expect(Object.keys(wrapper.vm.expanded).length).toEqual(1);
                });

                it('should set rowId expanded to undefined if singleExpand and already expanded', () => {
                    wrapper.setProps({ singleExpand: true });

                    wrapper.vm.onClickExpand('rowId');
                    wrapper.vm.onClickExpand('rowId');

                    expect(wrapper.vm.expanded.rowId).not.toBeDefined();
                    expect(Object.keys(wrapper.vm.expanded).length).toEqual(0);
                });

                it('should set only one rowId expanded to true if singleExpand', () => {
                    wrapper.setProps({ singleExpand: true });

                    wrapper.vm.onClickExpand('rowId1');
                    wrapper.vm.onClickExpand('rowId2');

                    expect(wrapper.vm.expanded.rowId1).not.toBeDefined();
                    expect(wrapper.vm.expanded.rowId2).toBeDefined();
                    expect(wrapper.vm.expanded.rowId2).toEqual(true);
                    expect(Object.keys(wrapper.vm.expanded).length).toEqual(1);
                });
            });
        });

        describe('watch()', () => {
            describe('rowsPerPage()', () => {
                it('should be parsed as int', (done) => {
                    wrapper.setData({ rowsPerPage: '100' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.rowsPerPage).toEqual(100);
                        done();
                    });
                });

                it('should calculate and set page to new maximum page', (done) => {
                    wrapper.setProps({ rowsCount: 15 });
                    wrapper.setData({ page: 2 });
                    wrapper.setData({ rowsPerPage: '20' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.page).toEqual(1);
                        done();
                    });
                });

                it('should calculate and set page to new maximum page starting from 1', (done) => {
                    wrapper.setProps({ rowsCount: 0 });
                    wrapper.setData({ rowsPerPage: '20' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.page).toEqual(1);
                        done();
                    });
                });

                it('should not set page to new maximum page if in range', (done) => {
                    wrapper.setProps({ rowsCount: 25 });
                    wrapper.setData({ page: 2 });
                    wrapper.setData({ rowsPerPage: '20' });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.page).toEqual(2);
                        done();
                    });
                });

                it('should emit update event if page not changed', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'emitUpdate');

                    wrapper.setProps({ rowsCount: 25 });
                    wrapper.setData({ page: 2 });
                    wrapper.setData({ rowsPerPage: '20' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith({ rowsPerPage: 20 });
                        done();
                    });
                });
            });

            describe('page()', () => {
                it('should emit update event', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'emitUpdate');

                    wrapper.setData({ page: 2 });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith({ page: 2 });
                        done();
                    });
                });
            });

            describe('filter()', () => {
                it('should emit update event and reset page to 1', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'emitUpdate');

                    wrapper.setData({ page: 1 });
                    wrapper.setData({ filter: '123' });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith({ page: 1, filter: '123' });
                        done();
                    });
                });
            });
        });

        describe('computed', () => {
            describe('tableColumns', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tableColumns).toBeDefined();
                });

                it('should call add count, id and expand columns', (done) => {
                    const spyAddCountColumn = jest.spyOn(wrapper.vm, 'addCountColumn');
                    const spyAddIdColumn = jest.spyOn(wrapper.vm, 'addIdColumn');
                    const spyAddExpandColumn = jest.spyOn(wrapper.vm, 'addExpandColumn');

                    wrapper.setProps({ columns });

                    wrapper.vm.$nextTick(() => {
                        expect(spyAddCountColumn).toHaveBeenCalled();
                        expect(spyAddIdColumn).toHaveBeenCalled();
                        expect(spyAddExpandColumn).toHaveBeenCalled();
                        done();
                    });
                });

                it('should call filter columns', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'filterColumns');

                    wrapper.setProps({ columns });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalled();
                        done();
                    });
                });

                it('should be array of filtered columns with added count and id by default', (done) => {
                    wrapper.setProps({ columns });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.tableColumns.length).toEqual(columns.length + 2);
                        expect(wrapper.vm.tableColumns[0]).toEqual(expect.objectContaining({ path: 'id' }));
                        expect(wrapper.vm.tableColumns[1]).toEqual(expect.objectContaining({ path: '#' }));
                        done();
                    });
                });
            });

            describe('tableColumnsHeaderRendered', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tableColumnsHeaderRendered).toBeDefined();
                });

                it('should call render columns with renderHeader method name', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'renderColumns');

                    wrapper.setProps({ columns });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith(wrapper.vm.tableColumns, 'renderHeader');
                        expect(wrapper.vm.tableColumnsHeaderRendered).toEqual(wrapper.vm.renderColumns(wrapper.vm.tableColumns, 'renderHeader'));
                        done();
                    });
                });
            });

            describe('tableColumnsFooterRendered', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tableColumnsFooterRendered).toBeDefined();
                });

                it('should call render columns with renderFooter method name', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'renderColumns');

                    wrapper.setProps({ columns });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith(wrapper.vm.tableColumns, 'renderFooter');
                        expect(wrapper.vm.tableColumnsFooterRendered).toEqual(wrapper.vm.renderColumns(wrapper.vm.tableColumns, 'renderFooter'));
                        done();
                    });
                });
            });

            describe('tableRows', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tableRows).toBeDefined();
                });

                it('should call sort and filter rows', (done) => {
                    const spySortRows = jest.spyOn(wrapper.vm, 'sortRows');
                    const spyFilterRows = jest.spyOn(wrapper.vm, 'filterRows');

                    wrapper.setProps({ columns, rows });

                    wrapper.vm.$nextTick(() => {
                        expect(spySortRows).toHaveBeenCalled();
                        expect(spyFilterRows).toHaveBeenCalled();
                        done();
                    });
                });

                it('should be array of sorted and filtered rows', (done) => {
                    wrapper.setProps({ columns, rows });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.tableRows.length).toEqual(rows.length);
                        expect(wrapper.vm.tableRows[0]).toEqual(rows[0]);
                        done();
                    });
                });
            });

            describe('paginationConfig', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.paginationConfig).toBeDefined();
                });

                it('should call getConfig for pagination', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'getConfig');

                    wrapper.setProps({ pagination: {} });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalledWith('pagination');
                        done();
                    });
                });
            });

            describe('filteringConfig', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filteringConfig).toBeDefined();
                });

                it('should be equal to default filtering config', () => {
                    wrapper.setProps({ filtering: {} });

                    expect(wrapper.vm.filteringConfig).toEqual(defaultConfig.filtering);
                });

                it('should be equal to extended default filtering config', () => {
                    wrapper.setProps({
                        filtering: {
                            size: 'lg', fuse: { keys: ['abc'] }
                        }
                    });

                    expect(wrapper.vm.filteringConfig).toEqual({
                        ...defaultConfig.filtering,
                        size: 'lg',
                        fuse: {
                            ...defaultConfig.filtering.fuse,
                            keys: ['abc']
                        }
                    });
                });
            });

            describe('i18nConfig', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.i18nConfig).toBeDefined();
                });

                it('should be equal to default i18n config', () => {
                    const regEx = / *[{}] */;
                    expect(wrapper.vm.i18nConfig.pagination).toEqual({
                        rowsPerPage: defaultConfig.i18n.pagination.rowsPerPage.split(regEx),
                        rowsRange: defaultConfig.i18n.pagination.rowsRange.split(regEx)
                    });
                    expect(wrapper.vm.i18nConfig.filtering).toEqual(defaultConfig.i18n.filtering);
                });

                it('should be equal to extended default filtering config', () => {
                    wrapper.setProps({
                        i18n: {
                            pagination: {
                                rowsPerPage: 'Hello {rowsPerPage} world'
                            }
                        }
                    });

                    expect(wrapper.vm.i18nConfig.pagination.rowsPerPage).toEqual(['Hello', 'rowsPerPage', 'world']);
                });
            });

            describe('filterableColumns', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.filterableColumns).toBeDefined();
                    expect(wrapper.vm.filterableColumns).toEqual(['id', '#']);
                });

                it('should return fuse keys from filtering config', () => {
                    wrapper.setProps({ filtering: { fuse: { keys: ['a', 'b', 'c'] } } });

                    expect(wrapper.vm.filterableColumns).toEqual(['a', 'b', 'c']);
                });

                it('should return all column keys if filtering config keys not specified', () => {
                    wrapper.setProps({ columns });

                    expect(wrapper.vm.filterableColumns).toEqual(['id', '#', 'name', 'age']);
                });
            });

            describe('rowsLength', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.rowsLength).toBeDefined();
                    expect(wrapper.vm.rowsLength).toEqual(0);
                });

                it('should return rowsCount', () => {
                    wrapper.setProps({ rowsCount: 100 });

                    expect(wrapper.vm.rowsLength).toEqual(100);
                });

                it('should return tableRows length if rowsCount not provided', () => {
                    wrapper.setProps({ rows });

                    expect(wrapper.vm.rowsLength).toEqual(rows.length);
                });
            });

            describe('rowsFrom', () => {
                const rowsPerPage = 10;

                it('should be defined', () => {
                    expect(wrapper.vm.rowsFrom).toBeDefined();
                    expect(wrapper.vm.rowsFrom).toEqual(0);
                });

                it('should return 0 for first page', () => {
                    wrapper.setData({ page: 1, rowsPerPage });

                    expect(wrapper.vm.rowsFrom).toEqual(0);
                });

                it('should return (page - 1) * rowsPerPage for other page', () => {
                    wrapper.setData({ page: 3, rowsPerPage });

                    expect(wrapper.vm.rowsFrom).toEqual(20);
                });
            });

            describe('rowsTo', () => {
                const rowsPerPage = 10;
                const rowsCount = 100;

                it('should be defined', () => {
                    expect(wrapper.vm.rowsTo).toBeDefined();
                    expect(wrapper.vm.rowsTo).toEqual(0);
                });

                it('should return rowsPerPage for first page', () => {
                    wrapper.setData({ page: 1, rowsPerPage });
                    wrapper.setProps({ rowsCount });

                    expect(wrapper.vm.rowsTo).toEqual(rowsPerPage);
                });

                it('should return page * rowsPerPage for other page', () => {
                    wrapper.setData({ page: 2, rowsPerPage });
                    wrapper.setProps({ rowsCount });

                    expect(wrapper.vm.rowsTo).toEqual(20);
                });

                it('should return page * rowsPerPage for last page', () => {
                    wrapper.setData({ page: 10, rowsPerPage });
                    wrapper.setProps({ rowsCount });

                    expect(wrapper.vm.rowsTo).toEqual(100);
                });

                it('should return rowsLength for last page if it exceeds maximum', () => {
                    wrapper.setData({ page: 3, rowsPerPage });
                    wrapper.setProps({ rowsCount: 25 });

                    expect(wrapper.vm.rowsTo).toEqual(25);
                });
            });

            describe('rowsTo', () => {
                let expandWrapper;
                let scopedExpandWrapper;

                beforeEach(() => {
                    expandWrapper = shallowMount(Datatable, {
                        slots: {
                            expand: '<div/>'
                        }
                    });

                    scopedExpandWrapper = shallowMount(Datatable, {
                        scopedSlots: {
                            expand: '<div/>'
                        }
                    });
                });

                it('should be defined', () => {
                    expect(wrapper.vm.hasExpandableRows).toBeDefined();
                    expect(wrapper.vm.hasExpandableRows).toEqual(false);
                });

                it('should return true for existing expand slot', () => {
                    expect(expandWrapper.vm.hasExpandableRows).toEqual(true);
                });

                it('should return true for existing expand scoped slot', () => {
                    expect(scopedExpandWrapper.vm.hasExpandableRows).toEqual(true);
                });
            });
        });

        describe('created()', () => {
            it('should set rowsPerPage to paginationConfig rowsPerPage', (done) => {
                wrapper.setProps({ pagination: { rowsPerPage: 100 } });

                wrapper.vm.created();
                wrapper.vm.$nextTick(() => {
                    expect(wrapper.vm.rowsPerPage).toEqual(100);
                    done();
                });
            });

            it('should trigger initial update event', (done) => {
                wrapper.setProps({ pagination: { rowsPerPage: 100 } });

                expect(wrapper.emitted().update.length).toEqual(1);

                wrapper.vm.created();
                wrapper.vm.$nextTick(() => {
                    expect(wrapper.emitted().update.length).toEqual(2);
                    done();
                });
            });
        });
    });
});

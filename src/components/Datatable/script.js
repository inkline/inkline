import Table from '@inkline/inkline/src/components/Table';
import { sortBy, getValueByPath } from "@inkline/inkline/src/helpers";

export default {
    name: 'IDatatable',
    extends: Table,
    props: {
        columns: {
            type: Array,
            default: () => []
        },
        rows: {
            type: Array,
            default: () => []
        },
        countColumn: {
            type: Object,
            default: () => ({})
        },
        defaultSortKey: {
            type: String,
            default: '#'
        }
    },
    data() {
        return {
            sortBy: this.defaultSortKey,
            sortDirection: 'asc'
        }
    },
    computed: {
        tableColumns() {
            let columns = [
                {
                    title: '#',
                    key: '#',
                    classes: '-count',
                    align: 'right',
                    sortable: true,
                    render: (row, column, index) => index + 1,
                    ...this.countColumn
                },
                ...this.columns
            ];

            // Filter
            // Discard hidden columns
            columns = columns.filter((column) => !column.hidden);

            // Type
            // Set string as default column type
            columns = columns.map((column) => ({
                align: 'left',
                ...column
            }));

            return columns;
        },
        tableRows() {
            let rows = [
                ...this.rows
            ];

            // Sort
            // Sort rows based on sorting function
            const sortColumn = this.tableColumns.find((column) => column.key === this.sortBy);
            if (sortColumn) {
                rows = sortColumn.sortFn ? rows.sort(sortColumn.sortFn) : rows.sort(sortBy(sortColumn.key));
            }

            // Sort descending
            // If sort direction is set to descending, reverse the rows array
            if (this.sortDirection === 'desc') {
                rows = rows.reverse();
            }

            return rows;
        },
        tableRowsRendered() {
            return this.tableRows.map((row, index) => this.tableColumns
                .reduce((renderedRow, column) => {
                    renderedRow[column.key] = column.render ?
                        column.render(row, column, index) :
                        getValueByPath(row, column.key);

                    return renderedRow;
                }, {}));
        }
    },
    methods: {
        onHeaderCellClick(column) {
            if (column.sortable) {
                if (this.sortBy !== column.key) {
                    this.sortBy = column.key;
                    this.sortDirection = 'asc';
                } else {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                }
            }
        },
        columnClass(column, row) {
            let classes = [`-align-${column.align}`];

            if (!row && column.sortable) {
                classes = classes.concat('-sortable');
            }

            // Add column specific classes
            if (column.classes) {
                classes = classes.concat(column.classes.constructor === Array ?
                    column.classes : [column.classes]);
            }

            // Add row specific classes for current column
            if (row && row.config && row.config.columnClass && row.config.columnClass[column.key]) {
                classes = classes.concat(row.config.columnClass[column.key]);
            }

            return classes;
        },
        rowClass(row) {
            let classes = [];

            // Add row specific classes
            if (row && row.config && row.config.rowClass) {
                classes = classes.concat(row.config.rowClass);
            }

            return classes;
        }
    }
};

import Fuse from 'fuse.js';
import ITable from '@inkline/inkline/src/components/Table';
import IIcon from '@inkline/inkline/src/components/Icon';
import IInput from '@inkline/inkline/src/components/Input';
import ISelect from '@inkline/inkline/src/components/Select';
import ISelectOption from '@inkline/inkline/src/components/SelectOption';
import IPagination from '@inkline/inkline/src/components/Pagination';
import { sortByPath, getValueByPath } from '@inkline/inkline/src/helpers';

export const defaults = {
    pagination: {
        limit: { xs: 3, sm: 5 },
        size: 'md',
        variant: 'light',
        rowsCount: null,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 25, 50, 100],
        async: false,
        i18n: {
            rowsPerPage: 'Show {rowsPerPage} entries',
            range: 'Showing {rowsFrom} to {rowsTo} of {rowsCount} entries'
        }
    },
    filtering: {
        size: 'md',
        variant: 'light',
        async: false,
        i18n: {
            search: 'Search'
        },
        fuse: {
            shouldSort: false,
            includeMatches: true,
            includeScore: true,
            threshold: 0.25,
            location: 0,
            distance: 50,
            tokenize: true,
            maxPatternLength: 32,
            minMatchCharLength: 2
        }
    }
};

export const countColumn = {
    title: '#',
    path: '#',
    classes: '-count',
    align: 'right',
    sortable: true,
    render: (row, column, index) => (this.page - 1) * this.rowsPerPage + index + 1
};

export default {
    name: 'IDatatable',
    extends: ITable,
    components: {
        IIcon,
        IInput,
        ISelect,
        ISelectOption,
        IPagination
    },
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
        },
        filtering: {
            type: [Boolean, Object],
            default: true
        },
        pagination: {
            type: [Boolean, Object],
            default: true
        },
        footer: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            sortBy: this.defaultSortKey,
            sortDirection: 'asc',
            rowsPerPage: 1,
            page: 1,
            search: '',
            tableRows: [],
            fuse: new Fuse([], {})
        }
    },
    computed: {
        tableColumns() {
            let columns = [
                { ...countColumn, ...this.countColumn },
                ...this.columns
            ];

            // Filter
            // Discard hidden columns
            columns = columns.filter((column) => !column.hidden);

            // Type
            // Set string as default column type
            columns = columns.map((column) => ({ align: 'left', ...column }));

            return columns;
        },
        tableRows() {
            let rows = [ ...this.rows ];

            rows = this.sortRows(rows);
            rows = this.filterRows(rows);

            return rows;
        },
        tableColumnsRendered() {
            return this.tableColumns.reduce((renderedColumn, column, index) => {
                renderedColumn[column.path] = column.renderHeader ?
                    column.renderHeader(column, index) :
                    column.title;

                return renderedColumn;
            }, {});
        },
        tableRowsRendered() {
            return this.tableRows.map((row, index) => this.tableColumns
                .reduce((renderedRow, column) => {
                    renderedRow[column.path] = column.render ?
                        column.render(row, column, index) :
                        getValueByPath(row, column.path);

                    return renderedRow;
                }, {}));
        },
        paginationConfig() {
            const config = this.getConfig('pagination');

            const messagesRegEx = / *[{}] */;
            config.i18n.rowsPerPage = String.prototype.split.apply(config.i18n.rowsPerPage, [messagesRegEx]);
            config.i18n.range = String.prototype.split.apply(config.i18n.range, [messagesRegEx]);

            return config;
        },
        filteringConfig() {
            const config = this.getConfig('filtering');

            config.fuse = { ...defaults.filtering.fuse, ...(this.filtering.fuse || {}) };

            return config;
        },
        filterableColumns() {
            return this.filteringConfig.fuse.keys || this.tableColumns.map((column) => column.path);
        },
        // rowsCount() {
        //     return this.paginationConfig.rowsCount ||
        //         this.filter !== '' && !this.filteringConfig.async && this.tableRows.length ||
        //         this.rows.length;
        // },
        // rowsFrom() {
        //     return (this.page - 1) * this.rowsPerPage;
        // },
        // rowsTo() {
        //     const to = this.page * this.rowsPerPage;
        //
        //     return to > this.rowsCount ? this.rowsCount : to;
        // }
    },
    methods: {
        onHeaderCellClick(column) {
            if (column.sortable) {
                if (this.sortBy !== column.path) {
                    this.sortBy = column.path;
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
            if (row && row.config && row.config.columnClass && row.config.columnClass[column.path]) {
                classes = classes.concat(row.config.columnClass[column.path]);
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
        },
        /**
         * Sort rows based on sorting direction and sorting function
         *
         * @param rows
         * @returns {*}
         */
        sortRows(rows) {
            const sortColumn = this.tableColumns.find((column) => column.path === this.sortBy);

            if (sortColumn) {
                rows = sortColumn.sortFn ? rows.sort(sortColumn.sortFn) : rows.sort(sortByPath(sortColumn.path));
            }

            // If sort direction is set to descending, reverse the rows array
            if (this.sortDirection === 'desc') {
                rows = rows.reverse();
            }

            return rows;
        },
        /**
         * Find rows that match the given search string
         *
         * @param rows
         * @returns {*}
         */
        filterRows(rows) {
            if (this.filter === '') { return rows }

            if (this.filtering && !this.filteringConfig.async) {
                const fuse = new Fuse(rows, { ...this.filteringConfig.fuse, keys: this.filterableColumns });

                rows = fuse.search(this.filter).map((result) => result.item);
            }

            return rows;
        },
        /**
         * Slice rows to display current page
         *
         * @param rows
         * @returns {*}
         */
        paginateRows(rows) {
            if (this.pagination && !this.paginationConfig.async) {
                const from = (this.page - 1) * this.rowsPerPage;
                const to = this.page * this.rowsPerPage;

                rows = rows.slice(from, to > rows.length ? rows.length : to);
            }

            return rows
        },
        /**
         * Extend default configuration object with provided override values
         *
         * @param key
         * @returns {*}
         */
        getConfig(key) {
            return this[key] && this[key] !== true ?
                {
                    ...defaults[key], ...this[key],
                    i18n: { ...defaults[key].i18n, ...(this[key].i18n || {}) }
                } :
                {
                    ...defaults[key],
                    i18n: { ...defaults[key].i18n }
                };
        }
    },
    watch: {
        rowsPerPage(value) {
            value = parseInt(value, 10);

            this.rowsPerPage = value;

            const maxPage = Math.ceil(this.rowsCount / value);
            if (this.page > maxPage) {
                this.page = maxPage;
            } else {
                this.$emit('pagination', this.page, value);
            }
        },
        page(value) {
            this.$emit('pagination', value, this.rowsPerPage);
        }
    },
    created() {
        this.rowsPerPage = this.paginationConfig.rowsPerPage;
    }
};

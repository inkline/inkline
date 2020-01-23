import Fuse from 'fuse.js';
import ITable from '@inkline/inkline/src/components/Table';
import IIcon from '@inkline/inkline/src/components/Icon';
import IInput from '@inkline/inkline/src/components/Input';
import ISelect from '@inkline/inkline/src/components/Select';
import ISelectOption from '@inkline/inkline/src/components/SelectOption';
import IPagination from '@inkline/inkline/src/components/Pagination';
import ITransitionExpand from '@inkline/inkline/src/transitions/TransitionExpand';
import { sortByPath, getValueByPath } from '@inkline/inkline/src/helpers';

export const defaults = {
    pagination: {
        limit: { xs: 3, sm: 5 },
        size: 'md',
        variant: 'light',
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 25, 50, 100]
    },
    filtering: {
        size: 'md',
        variant: 'light',
        fuse: {
            shouldSort: false,
            includeMatches: true,
            includeScore: true,
            threshold: 0.25,
            location: 0,
            distance: 75,
            tokenize: true,
            maxPatternLength: 32,
            minMatchCharLength: 1
        }
    },
    i18n: {
        pagination: {
            rowsPerPage: 'Show {rowsPerPage} entries',
            rowsRange: 'Showing {rowsFrom} to {rowsTo} of {rowsCount} entries'
        },
        filtering: {
            inputPlaceholder: 'Search',
            noResultsFound: 'No matching records found',
        }
    },
};

export const idColumn = {
    title: '',
    path: 'id',
    custom: true
};

export const countColumn = {
    title: '#',
    path: '#',
    classes: '-count',
    align: 'right',
    sortable: true,
    render(row, column, index) {
        return (this.page - 1) * this.rowsPerPage + index + 1;
    }
};

export const expandColumn = {
    title: '',
    path: '^',
    classes: '-expand',
    custom: true
};

export default {
    name: 'IDatatable',
    extends: ITable,
    components: {
        IIcon,
        IInput,
        ISelect,
        ISelectOption,
        IPagination,
        ITransitionExpand
    },
    props: {
        async: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            default: () => []
        },
        countColumn: {
            type: [Boolean, Object],
            default: () => ({})
        },
        expandColumn: {
            type: [Boolean, Object],
            default: () => ({})
        },
        rows: {
            type: Array,
            default: () => []
        },
        rowsCount: {
            type: Number,
            default: null
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
        },
        singleExpand: {
            type: Boolean,
            default: false
        },
        i18n: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            sortBy: this.defaultSortKey,
            sortDirection: 'asc',
            rowsPerPage: 0,
            page: 1,
            search: '',
            expanded: {}
        }
    },
    computed: {
        tableColumns() {
            let columns = [...this.columns];

            columns = this.addCountColumn(columns);
            columns = this.addIdColumn(columns);
            columns = this.addExpandColumn(columns);
            columns = this.filterColumns(columns);

            return columns;
        },
        tableColumnsHeaderRendered() {
            return this.renderColumns(this.tableColumns, 'renderHeader');
        },
        tableColumnsFooterRendered() {
            return this.renderColumns(this.tableColumns, 'renderFooter');
        },
        tableRows() {
            let rows = [ ...this.rows ];

            rows = this.sortRows(rows);
            rows = this.filterRows(rows);

            return rows;
        },
        tableRowsRendered() {
            let rows = this.tableRows;

            rows = this.paginateRows(rows);
            rows = this.renderRows(rows);

            return rows;
        },
        paginationConfig() {
            return this.getConfig('pagination');
        },
        filteringConfig() {
            const config = this.getConfig('filtering');

            config.fuse = { ...defaults.filtering.fuse, ...(this.filtering.fuse || {}) };

            return config;
        },
        i18nConfig() {
            const config = {
                pagination: { ...defaults.i18n.pagination, ...this.i18n.pagination },
                filtering: { ...defaults.i18n.filtering, ...this.i18n.filtering },
            };

            Object.keys(config.pagination).forEach((key) => {
                config.pagination[key] = String.prototype.split.apply(config.pagination[key], [/ *[{}] */]);
            });

            return config;
        },
        filterableColumns() {
            return this.filteringConfig.fuse.keys || this.tableColumns.map((column) => column.path);
        },
        rowsLength() {
            return this.rowsCount ||
                // this.filter !== '' && !this.filteringConfig.async && this.tableRows.length ||
                this.tableRows.length;
        },
        rowsFrom() {
            return (this.page - 1) * this.rowsPerPage;
        },
        rowsTo() {
            const to = this.page * this.rowsPerPage;

            return to > this.rowsLength ? this.rowsLength : to;
        },
        hasExpandableRows() {
            return Boolean(this.$slots.expand) || Boolean(this.$scopedSlots.expand);
        }
    },
    methods: {
        /**
         * Click handler for header cell that triggers sorting and toggles sort direction
         *
         * @param column
         */
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
        /**
         * Return rendered column header values
         *
         * @param columns
         * @param renderMethod
         * @returns {*}
         */
        renderColumns(columns, renderMethod) {
            return columns.reduce((renderedColumn, column, index) => {
                renderedColumn[column.path] = column[renderMethod] ?
                    column[renderMethod](column, index) :
                    column.title;

                return renderedColumn;
            }, {});
        },
        /**
         * Compute class names for the given column
         *
         * @param column
         * @param row
         * @returns {string[]}
         */
        columnClass(column, row) {
            let classes = [`-align-${column.align || 'left'}`];

            if (!row && column.sortable) {
                classes = classes.concat('-sortable');
            }

            if (column.sticky) {
                classes = classes.concat('-sticky');
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
        /**
         * Compute style for the given column
         *
         * @param column
         * @param row
         */
        columnStyle(column, row) {
            const style = { ...column.style, ...(row || {}).style };

            return Object.keys(style).length > 0 && style;
        },
        /**
         * Compute class names for the given row
         *
         * @param row
         * @returns {Array}
         */
        rowClass(row) {
            let classes = [];

            // Add row specific classes
            if (row && row.config && row.config.rowClass) {
                classes = classes.concat(row.config.rowClass);
            }

            return classes;
        },
        /**
         * Add an extended count column if enabled
         *
         * @param columns
         * @returns {*}
         */
        addIdColumn(columns) {
            columns.unshift({ ...idColumn });

            return columns;
        },
        /**
         * Add an extended count column if enabled
         *
         * @param columns
         * @returns {*}
         */
        addCountColumn(columns) {
            if (this.countColumn) {
                columns.unshift({ ...countColumn, ...this.countColumn });
            }

            return columns;
        },
        /**
         * Add the expand handler column
         *
         * @param columns
         * @returns {*}
         */
        addExpandColumn(columns) {
            if (this.hasExpandableRows && this.expandColumn) {
                columns.push({ ...expandColumn, ...this.expandColumn });
            }

            return columns;
        },
        /**
         * Remove hidden columns from the columns array
         *
         * @param columns
         * @returns {*}
         */
        filterColumns(columns) {
            return columns.filter((column) => !column.hidden);
        },
        /**
         * Return rows array with rendered row values
         *
         * @param rows
         * @returns {*}
         */
        renderRows(rows) {
            return rows.map((row, index) => this.tableColumns
                .reduce((renderedRow, column) => {
                    renderedRow[column.path] = column.render ?
                        column.render.call(this, row, column, index) :
                        getValueByPath(row, column.path);
                    renderedRow.indexRef = index;

                    return renderedRow;
                }, {}));
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
                rows = sortColumn.sortFn ?
                    rows.sort(sortColumn.sortFn) :
                    rows.sort(sortByPath(sortColumn.path));
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
            if (!this.filtering || this.async || this.search === '') {
                return rows;
            }

            const keys = this.filterableColumns;
            const fuse = new Fuse(rows, {
                ...this.filteringConfig.fuse,
                keys
            });

            return fuse.search(this.search).map((result) => result.item);
        },
        /**
         * Slice rows to display current page
         *
         * @param rows
         * @returns {*}
         */
        paginateRows(rows) {
            if (!this.pagination || this.async) {
                return rows;
            }

            return rows.slice(this.rowsFrom, this.rowsTo);
        },
        /**
         * Extend default configuration object with provided override values
         *
         * @param key
         * @returns {*}
         */
        getConfig(key) {
            return this[key] && this[key] !== true ?
                { ...defaults[key], ...this[key] } :
                { ...defaults[key] };
        },
        /**
         * Emit an extended update event
         *
         * @param event
         * @returns {*}
         */
        emitUpdate(event) {
            this.$emit('update', {
                page: this.page,
                rowsPerPage: this.rowsPerPage,
                filter: this.search,
                ...event
            });
        },
        onClickExpand(rowId) {
            if (this.singleExpand) {
                return this.expanded = this.expanded[rowId] ? {} : { [rowId]: true };
            }

            this.expanded = { ...this.expanded, [rowId]: !this.expanded[rowId] };
        }
    },
    watch: {
        rowsPerPage(value) {
            value = parseInt(value, 10);

            this.rowsPerPage = value;

            const maxPage = Math.ceil(this.rowsLength / value);
            if (this.page > maxPage) {
                this.page = maxPage;
            } else {
                this.emitUpdate({ rowsPerPage: value });
            }
        },
        page(value) {
            this.emitUpdate({ page: value });
        },
        search(value) {
            this.page = 1;
            this.emitUpdate({ page: 1, filter: value });
        }
    },
    created() {
        this.rowsPerPage = this.paginationConfig.rowsPerPage;
    }
};

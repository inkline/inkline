import {
    ref,
    selector,
    DefinitionOptions,
    defaultDefinitionOptions,
    multiply,
    valueOf,
    css
} from '@inkline/core';
import { useGrid, breakpointKeys, useBreakpointSelector, useFluid } from '@inkline/theme';
import { flexAlignItemsValues, flexDirectionValues, flexJustifyContentValues } from './types';

/**
 * Selectors
 */

export function useGridThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidMaxWidth } = useFluid(options);
    const { columns, columnGap, rowGap } = useGrid(options);

    selector(
        '.grid',
        {
            boxSizing: 'border-box',
            display: 'flex',
            flexShrink: 0,
            flexGrow: 0,
            flexBasis: 'auto',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            minWidth: 0,
            columnGap: ref(columnGap),
            rowGap: ref(rowGap)
        },
        options
    );

    selector(
        '.grid.-container',
        {
            marginLeft: 'auto',
            marginRight: 'auto',
            boxSizing: 'border-box',
            maxWidth: multiply(ref(fluidMaxWidth), '1px')
        },
        options
    );

    selector('.grid.-inline', { display: 'inline-flex', width: 'auto' }, options);

    selector('.grid.-no-wrap', { flexWrap: 'nowrap' }, options);

    selector('.grid.-no-gap', { gap: 0 }, options);

    flexDirectionValues.forEach((flexDirection) => {
        selector(`.grid.-direction-${flexDirection}`, { flexDirection }, options);
    });

    breakpointKeys.forEach((breakpoint) => {
        flexDirectionValues.forEach((flexDirection) => {
            useBreakpointSelector(
                `${breakpoint}-up`,
                selector(
                    `.grid.-${breakpoint}\\:direction-${flexDirection}`,
                    { flexDirection },
                    options
                ),
                options
            );
        });
    });

    flexAlignItemsValues.forEach((alignItems) => {
        selector(`.grid.-align-items-${alignItems}`, { alignItems }, options);
    });

    breakpointKeys.forEach((breakpoint) => {
        flexAlignItemsValues.forEach((alignItems) => {
            useBreakpointSelector(
                `${breakpoint}-up`,
                selector(
                    `.grid.-${breakpoint}\\:align-items-${alignItems}`,
                    { alignItems },
                    options
                ),
                options
            );
        });
    });

    flexJustifyContentValues.forEach((justifyContent) => {
        selector(`.grid.-justify-content-${justifyContent}`, { justifyContent }, options);
    });

    breakpointKeys.forEach((breakpoint) => {
        flexJustifyContentValues.forEach((justifyContent) => {
            useBreakpointSelector(
                `${breakpoint}-up`,
                selector(
                    `.grid.-${breakpoint}\\:justify-content-${justifyContent}`,
                    { justifyContent },
                    options
                ),
                options
            );
        });
    });

    const computeColumnWidth = (count: number) =>
        css`calc((${count} * ${'100%'} - (${ref(columns)} - ${count}) * ${ref(columnGap)}) / ${ref(columns)})`;
    const computeColumnOffset = (offset: number) =>
        css`calc((${'100%'} + ${ref(columnGap)}) * ${offset} / ${ref(columns)})`;

    const columnsCount = valueOf(columns);
    const columnsIndexes = Array.from(Array(columnsCount).keys());
    const columnsArray = columnsIndexes.map((index) => index + 1);

    columnsArray.forEach((count) => {
        selector(`.grid.-size-${count}`, { width: computeColumnWidth(count) }, options);
    });

    selector(`.grid.-size-auto`, { width: 'auto' }, options);

    selector(`.grid.-size-grow`, { flexGrow: '1', maxWidth: '100%' }, options);

    breakpointKeys.forEach((breakpoint) => {
        columnsArray.forEach((count) => {
            useBreakpointSelector(
                `${breakpoint}-up`,
                selector(
                    `.grid.-${breakpoint}\\:size-${count}`,
                    { width: computeColumnWidth(count) },
                    options
                ),
                options
            );
        });

        useBreakpointSelector(
            `${breakpoint}-up`,
            selector(`.grid.-${breakpoint}\\:size-auto`, { width: 'auto' }, options),
            options
        );

        useBreakpointSelector(
            `${breakpoint}-up`,
            selector(
                `.grid.-${breakpoint}\\:size-grow`,
                { flexGrow: '1', maxWidth: '100%' },
                options
            ),
            options
        );
    });

    columnsIndexes.forEach((offset) => {
        selector(`.grid.-offset-${offset}`, { marginLeft: computeColumnOffset(offset) }, options);
    });

    selector(`.grid.-offset-auto`, { marginLeft: 'auto' }, options);

    breakpointKeys.forEach((breakpoint) => {
        columnsIndexes.forEach((offset) => {
            useBreakpointSelector(
                `${breakpoint}-up`,
                selector(
                    `.grid.-${breakpoint}\\:offset-${offset}`,
                    { marginLeft: computeColumnOffset(offset) },
                    options
                ),
                options
            );
        });

        useBreakpointSelector(
            `${breakpoint}-up`,
            selector(`.grid.-${breakpoint}\\:offset-auto`, { marginLeft: 'auto' }, options),
            options
        );
    });
}

/**
 * Composables
 */

export function useGridTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useGridThemeSelectors(options);
}

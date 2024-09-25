import * as fs from 'fs';
import * as path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const globalKeywordValues = ['inherit', 'initial', 'revert', 'unset'];

const breakpointValues = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const colorValues = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
    'white',
    'light',
    'gray',
    'dark',
    'black',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'danger'
];

const colorSwatchValues = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'pink',
    'white',
    'light-tint-150',
    'light-tint-100',
    'light-tint-50',
    'light',
    'light-shade-50',
    'light-shade-100',
    'light-shade-150',
    'gray-tint-150',
    'gray-tint-100',
    'gray-tint-50',
    'gray',
    'gray-shade-50',
    'gray-shade-100',
    'gray-shade-150',
    'gray-50',
    'gray-100',
    'gray-200',
    'gray-300',
    'gray-400',
    'gray-500',
    'gray-600',
    'gray-700',
    'gray-800',
    'gray-900',
    'dark-tint-150',
    'dark-tint-100',
    'dark-tint-50',
    'dark',
    'dark-shade-50',
    'dark-shade-100',
    'dark-shade-150',
    'black',
    'primary-tint-150',
    'primary-tint-100',
    'primary-tint-50',
    'primary',
    'primary-shade-50',
    'primary-shade-100',
    'primary-shade-150',
    'primary-50',
    'primary-100',
    'primary-200',
    'primary-300',
    'primary-400',
    'primary-500',
    'primary-600',
    'primary-700',
    'primary-800',
    'primary-900',
    'secondary-tint-150',
    'secondary-tint-100',
    'secondary-tint-50',
    'secondary',
    'secondary-shade-50',
    'secondary-shade-100',
    'secondary-shade-150',
    'secondary-50',
    'secondary-100',
    'secondary-200',
    'secondary-300',
    'secondary-400',
    'secondary-500',
    'secondary-600',
    'secondary-700',
    'secondary-800',
    'secondary-900',
    'info-tint-150',
    'info-tint-100',
    'info-tint-50',
    'info',
    'info-shade-50',
    'info-shade-100',
    'info-shade-150',
    'info-50',
    'info-100',
    'info-200',
    'info-300',
    'info-400',
    'info-500',
    'info-600',
    'info-700',
    'info-800',
    'info-900',
    'success-tint-150',
    'success-tint-100',
    'success-tint-50',
    'success',
    'success-shade-50',
    'success-shade-100',
    'success-shade-150',
    'success-50',
    'success-100',
    'success-200',
    'success-300',
    'success-400',
    'success-500',
    'success-600',
    'success-700',
    'success-800',
    'success-900',
    'warning-tint-150',
    'warning-tint-100',
    'warning-tint-50',
    'warning',
    'warning-shade-50',
    'warning-shade-100',
    'warning-shade-150',
    'warning-50',
    'warning-100',
    'warning-200',
    'warning-300',
    'warning-400',
    'warning-500',
    'warning-600',
    'warning-700',
    'warning-800',
    'warning-900',
    'danger-tint-150',
    'danger-tint-100',
    'danger-tint-50',
    'danger',
    'danger-shade-50',
    'danger-shade-100',
    'danger-shade-150',
    'danger-50',
    'danger-100',
    'danger-200',
    'danger-300',
    'danger-400',
    'danger-500',
    'danger-600',
    'danger-700',
    'danger-800',
    'danger-900'
];

const borderWidthValues = ['', '0', '1', '2', '3', '4'];

const borderRadiusValues = ['', '0', '1', '2', '3', '4', '50%', '100%'];

const borderStyleValues = [
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset'
];

const verticalAlignmentValues = [
    'baseline',
    'top',
    'middle',
    'bottom',
    'text-top',
    'text-bottom',
    'sub',
    'super',
    ...globalKeywordValues
];

const displayValues = [
    'block',
    'inline',
    'inline-block',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'flow-root',
    'none',
    'contents',
    'table',
    'table-row',
    'list-item',
    'inherit',
    'initial',
    'revert',
    'unset'
];

const embedValues = ['21:9', '16:9', '4:3', '1:1'];

const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexValues = ['', 'inline', '1', 'auto', 'initial', 'none'];

const flexShrinkGrowValues = ['', '1'];

const flexBasisValues = ['auto', '0', '1', '2', '3', '4', '100%'];

const flexWrapValues = ['', 'wrap', 'nowrap', 'wrap-reverse'];

const alignItemsValues = [
    'flex-start',
    'start',
    'flex-end',
    'end',
    'center',
    'baseline',
    'stretch'
];

const alignSelfValues = [
    'auto',
    'flex-start',
    'start',
    'flex-end',
    'end',
    'center',
    'baseline',
    'stretch'
];

const alignContentValues = [
    'flex-start',
    'start',
    'flex-end',
    'end',
    'center',
    'space-between',
    'space-around',
    'stretch'
];

const justifyContentValues = [
    'flex-start',
    'start',
    'flex-end',
    'end',
    'center',
    'space-between',
    'space-around',
    'space-evenly'
];

const orderValues = [
    'first',
    'last',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
];

const floatValues = ['left', 'right', 'none'];

const listValues = ['inline', 'unstyled'];

const overflowValues = ['auto', 'hidden', 'scroll', 'visible'];

const positionValues = [
    'absolute',
    'fixed',
    'relative',
    'static',
    'sticky',
    'fixed-top',
    'fixed-bottom',
    'sticky-top'
];

const visuallyHiddenValues = ['', 'focusable'];

const baseSizingValues = ['unset', '0', '25%', '50%', '75%', '100%'];

const maxHeightSizingValues = ['100vh', '75vh', '50vh', '25vh', ...baseSizingValues];
const heightSizingValues = ['auto', ...maxHeightSizingValues];

const maxWidthSizingValues = ['100vw', '75vw', '50vw', '25vw', ...baseSizingValues];
const widthSizingValues = ['auto', ...maxWidthSizingValues];

const spacingValues = [
    '0',
    '1/4',
    '1/3',
    '1/2',
    '2/3',
    '3/4',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
];

const marginValues = ['auto', ...spacingValues];

const paddingValues = spacingValues;

const textAlignmentValues = [
    'center',
    'left',
    'right',
    'justify',
    'start',
    'end',
    ...globalKeywordValues
];

const textTransformValues = ['capitalize', 'lowercase', 'uppercase', 'none'];

const fontWeightValues = [
    'lighter',
    'extralight',
    'light',
    'normal',
    'semibold',
    'bold',
    'black',
    'bolder'
];

const fontStyleValues = ['normal', 'italic', 'oblique'];

const fontSizeValues = ['xs', 'sm', 'md', 'lg', 'xl'];

const fontFamilyValues = [
    'base',
    'monospace',
    'print',
    'primary-base',
    'primary-monospace',
    'primary-print',
    'secondary-base',
    'secondary-monospace',
    'secondary-print'
];

const whiteSpaceValues = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'];

const textStyleValues = [
    'muted',
    'weak',
    'weaker',
    'weakest',
    'reset',
    'hide',
    'truncate',
    'break-word'
];

const textDecorationValues = ['none', 'underline', 'overline', 'line-through', 'inherit'];

const breakpointVisibleValues = [
    '',
    'block',
    'inline',
    'inline-block',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid'
];

const cursorValues = [
    'auto',
    'default',
    'none',
    'context-menu',
    'help',
    'pointer',
    'progress',
    'wait',
    'cell',
    'crosshair',
    'text',
    'vertical-text',
    'alias',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'all-scroll',
    'col-resize',
    'row-resize',
    'n-resize',
    'e-resize',
    's-resize',
    'w-resize',
    'ne-resize',
    'nw-resize',
    'se-resize',
    'sw-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'zoom-in',
    'zoom-out',
    'inherit',
    'initial',
    'revert',
    'unset'
];

const pairs: Array<{
    property: string;
    values: string[];
    responsive?: boolean;
}> = [
    { property: 'vertical-align', values: verticalAlignmentValues },
    { property: 'border', values: borderWidthValues },
    { property: 'border-top', values: borderWidthValues },
    { property: 'border-right', values: borderWidthValues },
    { property: 'border-bottom', values: borderWidthValues },
    { property: 'border-left', values: borderWidthValues },
    { property: 'border-width', values: borderWidthValues },
    { property: 'border-top-width', values: borderWidthValues },
    { property: 'border-right-width', values: borderWidthValues },
    { property: 'border-bottom-width', values: borderWidthValues },
    { property: 'border-left-width', values: borderWidthValues },
    { property: 'border-style', values: borderStyleValues },
    { property: 'border-top-style', values: borderStyleValues },
    { property: 'border-right-style', values: borderStyleValues },
    { property: 'border-bottom-style', values: borderStyleValues },
    { property: 'border-left-style', values: borderStyleValues },
    { property: 'border-color', values: colorValues },
    { property: 'border-top-color', values: colorValues },
    { property: 'border-right-color', values: colorValues },
    { property: 'border-bottom-color', values: colorValues },
    { property: 'border-left-color', values: colorValues },
    { property: 'border-radius', values: borderRadiusValues },
    { property: 'border-top-left-radius', values: borderRadiusValues },
    { property: 'border-top-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-left-radius', values: borderRadiusValues },
    { property: 'border-top-radius', values: borderRadiusValues },
    { property: 'border-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-radius', values: borderRadiusValues },
    { property: 'border-left-radius', values: borderRadiusValues },
    { property: 'text-color', values: colorValues },
    { property: 'color', values: colorValues },
    { property: 'background-color', values: colorSwatchValues },
    { property: 'background', values: colorSwatchValues },
    { property: 'display', values: displayValues },
    { property: 'print:display', values: displayValues },
    { property: 'embed', values: embedValues },
    {
        property: 'flex-direction',
        values: flexDirectionValues
    },
    { property: 'flex', values: flexDirectionValues },
    { property: 'inline-flex', values: [''] },
    { property: 'flex', values: flexValues },
    {
        property: 'flex-shrink',
        values: flexShrinkGrowValues
    },
    { property: 'shrink', values: flexShrinkGrowValues },
    { property: 'flex-grow', values: flexShrinkGrowValues },
    { property: 'grow', values: flexShrinkGrowValues },
    { property: 'flex-basis', values: flexBasisValues },
    { property: 'basis', values: flexBasisValues },
    { property: 'flex-wrap', values: flexWrapValues },
    { property: 'align-items', values: alignItemsValues },
    { property: 'align-items', values: alignItemsValues },
    { property: 'align', values: alignItemsValues },
    { property: 'align-self', values: alignSelfValues },
    {
        property: 'align-content',
        values: alignContentValues
    },
    {
        property: 'justify-content',
        values: justifyContentValues
    },
    { property: 'justify', values: justifyContentValues },
    { property: 'order', values: orderValues },
    { property: 'float', values: floatValues },
    { property: 'clearfix', values: [''] },
    { property: 'list', values: listValues },
    { property: 'overflow', values: overflowValues },
    { property: 'overlay', values: [''] },
    { property: 'overlay-link', values: [''] },
    { property: 'position', values: positionValues },
    { property: 'visually-hidden', values: visuallyHiddenValues },
    { property: 'height', values: heightSizingValues },
    { property: 'max-height', values: maxHeightSizingValues },
    { property: 'width', values: widthSizingValues },
    { property: 'max-width', values: maxWidthSizingValues },
    { property: 'padding', values: paddingValues },
    { property: 'padding-top', values: paddingValues },
    { property: 'padding-right', values: paddingValues },
    { property: 'padding-bottom', values: paddingValues },
    { property: 'padding-left', values: paddingValues },
    { property: 'padding-x', values: paddingValues },
    { property: 'padding-y', values: paddingValues },
    { property: 'padding-block', values: paddingValues },
    { property: 'padding-block-start', values: paddingValues },
    { property: 'padding-block-end', values: paddingValues },
    { property: 'padding-inline', values: paddingValues },
    { property: 'padding-inline-start', values: paddingValues },
    { property: 'padding-inline-end', values: paddingValues },
    { property: 'margin', values: marginValues },
    { property: 'margin-top', values: marginValues },
    { property: 'margin-right', values: marginValues },
    { property: 'margin-bottom', values: marginValues },
    { property: 'margin-left', values: marginValues },
    { property: 'margin-x', values: marginValues },
    { property: 'margin-y', values: marginValues },
    { property: 'margin-block', values: marginValues },
    { property: 'margin-block-start', values: marginValues },
    { property: 'margin-block-end', values: marginValues },
    { property: 'margin-inline', values: marginValues },
    { property: 'margin-inline-start', values: marginValues },
    { property: 'margin-inline-end', values: marginValues },
    { property: 'text-align', values: textAlignmentValues, responsive: true },
    { property: 'text', values: textAlignmentValues, responsive: true },
    { property: 'text-transform', values: textTransformValues },
    { property: 'text', values: textTransformValues },
    { property: 'font-weight', values: fontWeightValues },
    { property: 'text', values: fontWeightValues },
    { property: 'font-size', values: fontSizeValues },
    { property: 'text', values: fontSizeValues },
    { property: 'font-style', values: fontStyleValues },
    { property: 'text', values: fontStyleValues },
    { property: 'font-family', values: fontFamilyValues },
    { property: 'text', values: fontFamilyValues },
    { property: 'white-space', values: whiteSpaceValues },
    { property: 'text', values: whiteSpaceValues },
    { property: 'text', values: textStyleValues },
    { property: 'text-decoration', values: textDecorationValues },
    { property: 'vertical-align', values: verticalAlignmentValues },
    { property: 'border', values: borderWidthValues },
    { property: 'border-top', values: borderWidthValues },
    { property: 'border-right', values: borderWidthValues },
    { property: 'border-bottom', values: borderWidthValues },
    { property: 'border-left', values: borderWidthValues },
    { property: 'border-width', values: borderWidthValues },
    { property: 'border-top-width', values: borderWidthValues },
    { property: 'border-right-width', values: borderWidthValues },
    { property: 'border-bottom-width', values: borderWidthValues },
    { property: 'border-left-width', values: borderWidthValues },
    { property: 'border-style', values: borderStyleValues },
    { property: 'border-top-style', values: borderStyleValues },
    { property: 'border-right-style', values: borderStyleValues },
    { property: 'border-bottom-style', values: borderStyleValues },
    { property: 'border-left-style', values: borderStyleValues },
    { property: 'border-color', values: colorValues },
    { property: 'border-top-color', values: colorValues },
    { property: 'border-right-color', values: colorValues },
    { property: 'border-bottom-color', values: colorValues },
    { property: 'border-left-color', values: colorValues },
    { property: 'border-radius', values: borderRadiusValues },
    { property: 'border-top-left-radius', values: borderRadiusValues },
    { property: 'border-top-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-left-radius', values: borderRadiusValues },
    { property: 'border-top-radius', values: borderRadiusValues },
    { property: 'border-right-radius', values: borderRadiusValues },
    { property: 'border-bottom-radius', values: borderRadiusValues },
    { property: 'border-left-radius', values: borderRadiusValues },
    { property: 'text-color', values: colorValues },
    { property: 'color', values: colorValues },
    { property: 'cursor', values: cursorValues },
    { property: 'background-color', values: colorSwatchValues },
    { property: 'background', values: colorSwatchValues },
    { property: 'display', values: displayValues },
    { property: 'embed', values: embedValues },
    { property: 'flex-direction', values: flexDirectionValues },
    { property: 'flex', values: flexDirectionValues },
    { property: 'inline-flex', values: [''] },
    { property: 'flex', values: flexValues },
    { property: 'flex-shrink', values: flexShrinkGrowValues },
    { property: 'shrink', values: flexShrinkGrowValues },
    { property: 'flex-grow', values: flexShrinkGrowValues },
    { property: 'grow', values: flexShrinkGrowValues },
    { property: 'flex-basis', values: flexBasisValues },
    { property: 'basis', values: flexBasisValues },
    { property: 'flex-wrap', values: flexWrapValues },
    { property: 'align-items', values: alignItemsValues },
    { property: 'align', values: alignItemsValues },
    { property: 'align-self', values: alignSelfValues },
    { property: 'align-content', values: alignContentValues },
    { property: 'justify-content', values: justifyContentValues },
    { property: 'justify', values: justifyContentValues },
    { property: 'order', values: orderValues },
    { property: 'float', values: floatValues },
    { property: 'clearfix', values: [''] },
    { property: 'list', values: listValues },
    { property: 'overflow', values: overflowValues },
    { property: 'overlay', values: [''] },
    { property: 'overlay-link', values: [''] },
    { property: 'position', values: positionValues },
    { property: 'visually-hidden', values: visuallyHiddenValues },
    { property: 'padding', values: spacingValues },
    { property: 'padding-top', values: spacingValues },
    { property: 'padding-right', values: spacingValues },
    { property: 'padding-bottom', values: spacingValues },
    { property: 'padding-left', values: spacingValues },
    { property: 'padding-x', values: spacingValues },
    { property: 'padding-y', values: spacingValues },
    { property: 'padding-block', values: spacingValues },
    { property: 'padding-block-start', values: spacingValues },
    { property: 'padding-block-end', values: spacingValues },
    { property: 'padding-inline', values: spacingValues },
    { property: 'padding-inline-start', values: spacingValues },
    { property: 'padding-inline-end', values: spacingValues },
    { property: 'margin', values: spacingValues },
    { property: 'margin-top', values: spacingValues },
    { property: 'margin-right', values: spacingValues },
    { property: 'margin-bottom', values: spacingValues },
    { property: 'margin-left', values: spacingValues },
    { property: 'margin-x', values: spacingValues },
    { property: 'margin-y', values: spacingValues },
    { property: 'margin-block', values: spacingValues },
    { property: 'margin-block-start', values: spacingValues },
    { property: 'margin-block-end', values: spacingValues },
    { property: 'margin-inline', values: spacingValues },
    { property: 'margin-inline-start', values: spacingValues },
    { property: 'margin-inline-end', values: spacingValues },
    { property: 'text-align', values: textAlignmentValues },
    { property: 'text', values: textAlignmentValues },
    { property: 'text-transform', values: textTransformValues },
    { property: 'text', values: textTransformValues },
    { property: 'font-weight', values: fontWeightValues },
    { property: 'text', values: fontWeightValues },
    { property: 'font-size', values: fontSizeValues },
    { property: 'text', values: fontSizeValues },
    { property: 'font-style', values: fontStyleValues },
    { property: 'text', values: fontStyleValues },
    { property: 'font-family', values: fontFamilyValues },
    { property: 'text', values: fontFamilyValues },
    { property: 'white-space', values: whiteSpaceValues },
    { property: 'text', values: textStyleValues },
    { property: 'text-decoration', values: textDecorationValues },
    ...breakpointPair({ property: 'visible', values: breakpointVisibleValues }),
    ...breakpointPair({ property: 'hidden', values: [''] })
];

function breakpointPair({ property, values }: { property: string; values: string[] }) {
    return breakpointValues
        .map((breakpoint) => ({
            property: `${breakpoint}:${property}`,
            values
        }))
        .concat({ property, values });
}

let classes = '';
for (const { property, values, responsive } of pairs) {
    const breakpoints = [''];
    if (responsive) {
        breakpoints.push('xs', 'sm', 'md', 'lg', 'xl', 'xxl');
    }

    for (const breakpoint of breakpoints) {
        for (const value of values) {
            const className = `_${
                breakpoint ? `${breakpoint}:` : ''
            }${property}${value !== '' ? `:${value}` : ''}`;

            classes += `${className}\n`;
            classes += `${className}!\n`;
        }
    }

    classes += '\n';
}

const document = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Vite App</title>
</head>
<body>
<div id="app">
    <div class="
${classes}
    "></div>
</div>
<script type="module" src="./main.ts"></script>
</body>
</html>
`;

fs.writeFileSync(path.resolve(__dirname, 'index.html'), document);

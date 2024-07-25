import { useDarkTheme } from './useDarkTheme';
import { defaultDefinitionOptions } from '../constants';
import { useDefaultTheme } from './useDefaultTheme';

export function useTheme(options = defaultDefinitionOptions) {
    const defaultTheme = useDefaultTheme(options);
    const darkTheme = useDarkTheme(options);

    return {
        ...darkTheme,
        ...defaultTheme
    };
}

// import { add, color, divide, multiply, ref, selector, subtract, variable } from './tokens';
// import {
//     defineFontFamily,
//     defineFontSize,
//     defineFontWeight,
//     defineLetterSpacing,
//     defineLineHeight,
//     defineTextAlignment,
//     defineTextColor
// } from '../src';
// import { sizeMultiplierVariants } from '../src/presets/common';
//
// /**
//  * Selectors
//  */
//
// export const buttonBorder = variable('border', ref(border));
// export const buttonPaddingTop = variable('padding-top', ref(paddingTop), { namespace: 'button' });
// export const buttonPaddingRight = variable('padding-right', ref(paddingRight));
// export const buttonPaddingBottom = variable('padding-bottom', ref(paddingBottom));
// export const buttonPaddingLeft = variable('padding-left', ref(paddingLeft));
// export const buttonPadding = variable('padding', [
//     ref(buttonPaddingTop),
//     ref(buttonPaddingRight),
//     ref(buttonPaddingBottom),
//     ref(buttonPaddingLeft)
// ]);
//
// selector('.button', {
//     border: ref(buttonBorder),
//     background: 'red',
//     padding: ref(buttonPadding)
//     // fontSize: ref(fontSize)
// });
//
// selector('.button.-sm', {
//     fontSize: ref(padding)
// });
//
// // .button {
// //   border: var(--border);
// //   background: red;
// //   margin: var(--margin);
// // }
//
// // '.button': 'bordered bg-red m-1'
//
// selector('.button:hover', {
//     background: 'blue'
// });
//
// // .button:hover {
// //   background: blue;
// // }
//
// // '.button:hover': 'hover:bg-blue'
//
// selector('.button:disabled', {
//     background: 'gray'
// });
//
// // .button:disabled {
// //   background: gray;
// // }
//
// // '.button:disabled': 'bg-gray'
//
// selector(
//     '.button',
//     {
//         background: 'blue'
//     },
//     { theme: 'dark' }
// );
//
// // button = "dark:bg-blue"
//
// selector('.alert .alert-title', {
//     background: 'blue'
// });

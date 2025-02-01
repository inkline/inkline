import { DefinitionOptions } from '@inkline/core';

// import {
//     DefinitionOptions,
//     multiply,
//     addVariableNamespace,
//     nsvariable,
//     ref,
//     selector
// } from '@inkline/core';
// import {
//     useFontFamily,
//     useFontSize,
//     useFontStyle,
//     useFontWeight,
//     useSpacing,
//     useScale
// } from '../../../variables';
//
// const ns =  'display';
//
// export function useDisplayThemeVariables(userOptions: DefinitionOptions) {\nconst options = { ...defaultDefinitionOptions, ...userOptions };
// const options = { ...defaultDefinitionOptions, ...userOptions };
//     const { marginBottom } = useSpacing(options);
//     const { fontFamilyBaseSecondary } = useFontFamily(options);
//     const { fontStyleNormal } = useFontStyle(options);
//     const { fontSize } = useFontSize(options);
//     const { fontWeightBold } = useFontWeight(options);
//
//     const { scalePow1, scalePow2, scalePow3, scalePow4, scalePow5 } =
//         useScale(options);
//
//     const displayMarginBottom = addVariableNamespace(ns, marginBottom, options);
//     const displayFontFamily = nsvariable(ns, 'font-family', ref(fontFamilyBaseSecondary), options);
//     const displayFontStyle = nsvariable(ns, 'font-style', ref(fontStyleNormal), options);
//     const displayFontWeight = nsvariable(ns, 'font-weight', ref(fontWeightBold), options);
//     const displayLineHeight = nsvariable(ns, 'line-height', 1.2, options);
//
//     const d6FontSize = nsvariable(
//         'd6',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5)),
//         options
//     );
//
//     const d5FontSize = nsvariable(
//         'd5',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5), ref(scalePow1)),
//         options
//     );
//
//     const d4FontSize = nsvariable(
//         'd4',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5), ref(scalePow2)),
//         options
//     );
//
//     const d3FontSize = nsvariable(
//         'd3',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5), ref(scalePow3)),
//         options
//     );
//
//     const d2FontSize = nsvariable(
//         'd2',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5), ref(scalePow4)),
//         options
//     );
//
//     const d1FontSize = nsvariable(
//         'd1',
//         'font-size',
//         multiply(ref(fontSize), ref(scalePow5), ref(scalePow5)),
//         options
//     );
//
//     return {
//         displayMarginBottom,
//         displayFontFamily,
//         displayFontStyle,
//         displayFontWeight,
//         displayLineHeight,
//         d1FontSize,
//         d2FontSize,
//         d3FontSize,
//         d4FontSize,
//         d5FontSize,
//         d6FontSize
//     };
// }
//
// export function useDisplayThemeSelectors(userOptions: DefinitionOptions) {\nconst options = { ...defaultDefinitionOptions, ...userOptions };
//     const {
//         displayMarginBottom,
//         displayFontFamily,
//         displayFontStyle,
//         displayFontWeight,
//         displayLineHeight,
//         d1FontSize,
//         d2FontSize,
//         d3FontSize,
//         d4FontSize,
//         d5FontSize,
//         d6FontSize
//     } = useDisplayThemeVariables(options);
//
//     selector('.d1, .d2, .d3, .d4, .d5, .d6', {
//         marginBottom: ref(displayMarginBottom),
//         fontFamily: ref(displayFontFamily),
//         fontStyle: ref(displayFontStyle),
//         fontWeight: ref(displayFontWeight),
//         color: 'inherit',
//         lineHeight: ref(displayLineHeight)
//     });
//
//     selector('.d6', {
//         fontSize: ref(d6FontSize)
//     });
//
//     selector('.d5', {
//         fontSize: ref(d5FontSize)
//     });
//
//     selector('.d4', {
//         fontSize: ref(d4FontSize)
//     });
//
//     selector('.d3', {
//         fontSize: ref(d3FontSize)
//     });
//
//     selector('.d2', {
//         fontSize: ref(d2FontSize)
//     });
//
//     selector('.d1', {
//         fontSize: ref(d1FontSize)
//     });
// }
//

export function useDisplayTheme(_userOptions: DefinitionOptions) {
    // const options = { ...defaultDefinitionOptions, ...userOptions };
//     useDisplayThemeVariables(options);
//     useDisplayThemeSelectors(options);
}

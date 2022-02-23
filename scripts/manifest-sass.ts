/* eslint-disable @typescript-eslint/no-var-requires, max-nested-callbacks */

/**
 * The manifest.ts file has changed, along with the manifest.js format.
 */

// import fs from 'fs';
// import path from 'path';
// import glob from 'glob';
// import { Manifest } from './manifest/index';
//
// glob(path.resolve(__dirname, '..', 'src', 'components', '**', 'manifest.js'), (error, files) => {
//     const selectorMixins: any[] = [];
//
//     if (error) {
//         console.error(error);
//         throw error;
//     }
//
//     files.forEach((fileName) => {
//         const dirname = path.dirname(fileName);
//         const manifest: Manifest = require(fileName);
//
//         if (!manifest.css) {
//             return;
//         }
//
//         selectorMixins.push({
//             name: manifest.name,
//             selector: manifest.css.selector
//         });
//
//         if (manifest.css.variables) {
//             const variables = manifest.css.variables;
//             const colors = manifest.css.variables.filter(({ type }) => type === 'color');
//             const sizes = manifest.css.variables.filter(({ type }) => type === 'size');
//
//             const colorKeys = Object.keys((colors.find((variable) => variable.variants) || { variants: {} } as any).variants);
//             const sizeKeys = Object.keys((sizes.find((variable) => variable.variants) || { variants: { sm: '', md: '', lg: '' } } as any).variants);
//
//             /**
//              * Base variables
//              */
//
//             const baseVariables = variables.map((variable) => {
//                 let value = !variable.value && variable.type ? variable.variants![manifest.css.defaults[variable.type]] : variable.value;
//
//                 if (Array.isArray(value)) {
//                     value = value.join(' ');
//                 }
//
//                 return `    /// ${variable.description}
//     /// @name ${variable.name}${ variable.type ? `\n    /// @type ${variable.type}` : '' }
//     ----${variable.name}: #{${value}};`;
//             });
//
//             /**
//              * Size variables
//              */
//
//             const sizeVariables = sizeKeys.map((variant) => ({
//                 variant,
//                 variables: sizes.map((variable) => {
//                     let value = variable.value || variable.variants![variant];
//
//                     if (Array.isArray(value)) {
//                         value = value.join(' ');
//                     }
//
//                     return `        /// ${variable.description}, for the ${variant} size variant
//         /// @name ${variable.name}${ variable.type ? `\n        /// @type ${variable.type}` : '' }
//         ----${variable.name}: calc(#{${value}} * #{size-multiplier('${variant}')});`;
//                 })
//             }));
//
//             /**
//              * Color variables
//              */
//
//             const colorVariables = colorKeys.map((variant) => ({
//                 variant,
//                 variables: colors.map((variable) => {
//                     let value = variable.variants![variant];
//
//                     if (Array.isArray(value)) {
//                         value = value.join(' ');
//                     }
//
//                     return `        /// ${variable.description}, for the ${variant} color variant
//         /// @name ${variable.name}${ variable.type ? `\n        /// @type ${variable.type}` : '' }
//         ----${variable.name}: #{${value}};`;
//                 })
//             }));
//
//
//             /**
//              * Output
//              */
//
//             const variablesOutput = `/**
//  * Variables
//  */
//
// ${manifest.css.selector} {
// ${baseVariables.join('\n\n')}
// }
// `;
//             fs.writeFileSync(path.join(dirname, 'css', '_variables.scss'), variablesOutput);
//
//             if (sizes.length > 0) {
//                 const sizesOutput = `/**
//  * Size variants
//  */
//
// ${manifest.css.selector} {
// ${sizeVariables.map(({ variant, variables }) => `    /// Variables for the ${variant} color variant
//     /// @name ${variant}
//     /// @type group
//     @include variant('${variant}'${manifest.css.type ? `, '${manifest.css.type}'` : ''}) {
// ${variables.join('\n\n')}
//     }`).join('\n\n')}
// }
// `;
//                 fs.writeFileSync(path.join(dirname, 'css', '_sizes.scss'), sizesOutput);
//             }
//
//             if (colors.length > 0) {
//                 const colorsOutput = `/**
//  * Color variants
//  */
//
// ${manifest.css.selector} {
// ${colorVariables.map(({ variant, variables }) => `    /// Variables for the ${variant} color variant
//     /// @name ${variant}
//     /// @type group
//     @include variant('${variant}'${manifest.css.type ? `, '${manifest.css.type}'` : ''}) {
// ${variables.join('\n\n')}
//     }`).join('\n\n')}
// }
// `;
//                 fs.writeFileSync(path.join(dirname, 'css', '_colors.scss'), colorsOutput);
//             }
//         }
//     });
//
//
//     const selectorsOutput = `////
// /// Component selector mixins
// ////
//
// ${selectorMixins.map((mixin) => `@mixin i-${mixin.name} {
//     ${mixin.selector} {
//         @content;
//     }
// }`).join('\n\n')}
// `;
//     fs.writeFileSync(path.join(__dirname, '..', 'src', 'css', 'mixins', '_selectors.scss'), selectorsOutput);
// });
//


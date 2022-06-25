import { build, toFile } from './build';
import { defaultConfig } from './defaults';

const contents = toFile(build(defaultConfig));

console.log(contents);

//
// I want all the root variables to be there
//
// I want utility classes to be created on demand, based on the root variables
// => This is where we can use unocss
//
// I want component/element restyling to be done globally, but in Inkline
// In the config file I only want to replace variables
//

// const config = [
//
//     /**
//      * Margin
//      */
//
//     { test: /margin$/, resolver: ({ config, value }) => parseSidesValue(config, value), setter: ({ config, value, path }) => setValueAtPath(config, value, path) },
//     { test: /margin.default$/, resolver: () => parseSidesValue() },
//     { test: /margin.(\w+)$/, resolver: () => parseSidesValue() },
//
//     /**
//      * Padding
//      */
//
//     { test: /padding$/, resolver: () => resolveSidesValue() },
//     { test: /padding.default$/, resolver: () => resolveSidesValue() },
//     { test: /padding.(\w+)$/, resolver: () => resolveValue() },
//
//     // /**
//     //  * Border
//     //  */
//     //
//     // { test: /border$/, resolver: () => "split then resolve each value" },
//     // { test: /border.default$/, resolver: () => "split then resolve each value" },
//     // { test: /border.width$/, resolver: () => resolveSidesValue() },
//     // { test: /border.(\w+).width$/, resolver: () => resolveValue() },
//     // { test: /border.style$/, resolver: () => resolveSidesValue() },
//     // { test: /border.(\w+).style$/, resolver: () => resolveValue() },
//     // { test: /border.color$/, resolver: () => resolveSidesValue().map(() => resolveColorValue()) },
//     // { test: /border.(\w+).color$/, resolver: () => resolveColorValue() },
//     //
//     // /**
//     //  * Box shadow
//     //  */
//     //
//     // { test: /boxShadow$/, resolver: () => resolveComposedValue() },
// ];

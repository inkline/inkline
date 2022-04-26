# @inkline/config

> 🚧 This package is still **Work In Progress**.

Support for file-based Design System configuration by [@alexgrozav](http://github.com/alexgrozav).

✅ Supports both TypeScript and JavaScript

✅ Fully typed

✅ 100% Tested

✅ CommonJS and ESM

## Installation
~~~bash
npm i -S @inkline/config
~~~

## Usage
Create an `inkline.config.ts` file and override configuration as needed:

~~~ts
export default {
    theme: {
        color: {
            red: '#ff0000'
        },
        margin: {
            top: '1rem',
            right: '1rem',
            bottom: '1rem',
            left: '1rem'
        }
    }
}
~~~

## License
ISC

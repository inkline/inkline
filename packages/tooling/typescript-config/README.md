# @grozav/typescript-config

- Extends standard
- Single quotes, semi
- Sensible defaults, best practices

## Usage

1. Install dependencies.
    ~~~bash
    npm i -D stylelint @grozav/stylelint-preset
    ~~~
2. Create a new `.stylelintrc.js` file and add the following:
    ~~~js
    module.exports = {
        extends: [
            '@grozav/stylelint-config'
        ]
    }
    ~~~
3. Add linting script to `package.json`:
    ~~~bash
    "lint": "stylelint --ext .vue,.css,.scss src",
    ~~~
   
## License
ISC

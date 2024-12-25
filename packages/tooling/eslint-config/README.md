# @inkline/eslint-config

- Typescript ready
- Extends standard
- Single quotes, semi
- Sensible defaults, best practices
- One-line of config

## Usage

1. Install dependencies.
    ~~~bash
    npm i -DE eslint @grozav/eslint-preset
    ~~~
2. Create a new `.eslintrc.js` file and add the following:
    ~~~js
    module.exports = {
        extends: '@grozav'
    }
    ~~~
3. Add linting script to `package.json`:
    ~~~bash
    "lint": "eslint --ext .vue,.ts,.tsx,.js,.jsx src",
    ~~~
   
## License
ISC

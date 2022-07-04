<p align="center">
    <a href="https://inkline.io/">
        <img src="https://raw.githubusercontent.com/inkline/inkline.io/main/src/assets/images/logo/logo-black.svg" alt="Inkline" width=72 height=72>
    </a>
</p>

<h1 align="center">Inkline</h1>
<h3 align="center">@inkline/cli</h3>

<p align="center">
    CLI for Inkline, the intuitive UI Components library that gives you a developer-friendly foundation for building high-quality, accessible, and customizable Vue.js 3 Design Systems.<br/><br/> Inkline CLI is written and maintained by <a href="https://github.com/alexgrozav">@alexgrozav</a>.
    <br/>
    <br/>
    <br/>
    <a href="https://inkline.io">Homepage</a>
    ·
    <a href="https://inkline.io/docs/introduction">Documentation</a>
    ·
    <a href="https://github.com/inkline/cli/issues">Issue Tracker</a>
</p>

<br/>
<br/>

## Introduction

Inkline's CLI, used for generating code that improves your Developer Experience. This package will be included in future releases of `inkline` by default.

## Installation

~~~bash
npm i -S @inkline/cli
~~~

## Usage

### Help

```bash
inkline help [command]
```

See a description and available options for a specific command.

### Initialize

```bash
inkline init
```

Generate a default `inkline.config.ts` theme configuration file.

[Read more about configuration files.](https://github.com/inkline/config)


| Option                 | Description                             |
|------------------------|-----------------------------------------|
| -c, --config <path>    | Path to inkline configuration file.     |
| -o, --outputDir <path> | Path to output directory.               |
| -e, --extname <ext>    | File extension to use for output files. |

### Generate CSS

```bash
inkline generate css
```

Generate CSS Variables based on your `inkline.config.ts` theme configuration file. The default output folder for your generated CSS files is `.inkline/css`. 

[Read more about configuration files.](https://github.com/inkline/config)


| Option                 | Description                             |
|------------------------|-----------------------------------------|
| -c, --config <path>    | Path to inkline configuration file.     |
| -o, --outputDir <path> | Path to output directory.               |
| -e, --extname <ext>    | File extension to use for output files. |


## License
ISC

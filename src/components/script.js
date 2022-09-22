const fs = require('fs');
const glob = require('glob');

glob.sync('./**/_component.scss').forEach((file) => {
    let contents = fs.readFileSync(file, 'utf8').toString();

    const componentName = contents.match(/\.([\w-]+) \{/)[1].replace('-wrapper', '');

    contents = contents.split('\n').map((line) => {
        const indent = line.match(/^\s*/)[0];
        return line
            .replace('var(----line-height)', `var(--${componentName}--line-height, var(--line-height))`)
            .replace('var(--transition-duration)', `var(--${componentName}--transition-duration, var(--transition-duration))`)
            .replace('var(--transition-easing)', `var(--${componentName}--transition-timing-function, var(--transition-timing-function))`)
            .replace(/transition-property: (.+);/, `transition-property: var(--${componentName}--transition-property, ($1));`)
            .replace('var(----color)', `var(--${componentName}--color)`)
            .replace('var(----width)', `var(--${componentName}--width)`)
            .replace('var(----height)', `var(--${componentName}--height)`)
            .replace('var(----size)', `var(--${componentName}--size)`)
            .replace('var(----z-index)', `var(--${componentName}--z-index)`)
            .replace('var(----background)', `var(--${componentName}--background)`)
            .replace('----background:', `--${componentName}--background:`)
            .replace('----border-color:', `--${componentName}--border-color:`)
            .replace('----color:', `--${componentName}--color:`)
            .replace('var(----color--disabled)', `var(--${componentName}--disabled--color)`)
            .replace('var(----background--disabled)', `var(--${componentName}--disabled--background)`)
            .replace('var(----border-color--disabled)', `var(--${componentName}--disabled--border-color)`)
            .replace('var(----font-size)', `var(--${componentName}--font-size, var(--font-size))`)
            .replace('var(----border-top-width)', `var(--${componentName}--border-top-width, var(--border-top-width))`)
            .replace('var(----border-right-width)', `var(--${componentName}--border-right-width, var(--border-right-width))`)
            .replace('var(----border-bottom-width)', `var(--${componentName}--border-bottom-width, var(--border-bottom-width))`)
            .replace('var(----border-left-width)', `var(--${componentName}--border-left-width, var(--border-left-width))`)
            .replace('var(----border-width)', `var(
${indent}${indent}--${componentName}--border-width,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--border-top-width, var(--border-top-width))
${indent}${indent}${indent}var(--${componentName}--border-right-width, var(--border-right-width))
${indent}${indent}${indent}var(--${componentName}--border-bottom-width, var(--border-bottom-width))
${indent}${indent}${indent}var(--${componentName}--border-left-width, var(--border-left-width))
${indent}${indent})
${indent})`)
            .replace('var(----border-top-style)', `var(--${componentName}--border-top-style, var(--border-top-style))`)
            .replace('var(----border-right-style)', `var(--${componentName}--border-right-style, var(--border-right-style))`)
            .replace('var(----border-bottom-style)', `var(--${componentName}--border-bottom-style, var(--border-bottom-style))`)
            .replace('var(----border-left-style)', `var(--${componentName}--border-left-style, var(--border-left-style))`)
            .replace('var(----border-style)', `var(
${indent}${indent}--${componentName}--border-style,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--border-top-style, var(--border-top-style))
${indent}${indent}${indent}var(--${componentName}--border-right-style, var(--border-right-style))
${indent}${indent}${indent}var(--${componentName}--border-bottom-style, var(--border-bottom-style))
${indent}${indent}${indent}var(--${componentName}--border-left-style, var(--border-left-style))
${indent}${indent})
${indent})`)
            .replace('var(----border-top-color)', `var(--${componentName}--border-top-color, var(--border-top-color))`)
            .replace('var(----border-right-color)', `var(--${componentName}--border-right-color, var(--border-right-color))`)
            .replace('var(----border-bottom-color)', `var(--${componentName}--border-bottom-color, var(--border-bottom-color))`)
            .replace('var(----border-left-color)', `var(--${componentName}--border-left-color, var(--border-left-color))`)
            .replace('var(----border-color)', `var(
${indent}${indent}--${componentName}--border-color,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--border-top-color, var(--border-top-color))
${indent}${indent}${indent}var(--${componentName}--border-right-color, var(--border-right-color))
${indent}${indent}${indent}var(--${componentName}--border-bottom-color, var(--border-bottom-color))
${indent}${indent}${indent}var(--${componentName}--border-left-color, var(--border-left-color))
${indent}${indent})
${indent})`)
            .replace('var(----box-shadow)', `var(
${indent}${indent}--${componentName}--box-shadow,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--box-shadow-x-offset, var(--box-shadow-offset-x))
${indent}${indent}${indent}var(--${componentName}--box-shadow-y-offset, var(--box-shadow-offset-y))
${indent}${indent}${indent}var(--${componentName}--box-shadow-blur-radius, var(--box-shadow-blur-radius))
${indent}${indent}${indent}var(--${componentName}--box-shadow-spread-radius, var(--box-shadow-spread-radius))
${indent}${indent}${indent}var(--${componentName}--box-shadow-color, var(--box-shadow-color))
${indent}${indent})
${indent})`)
            .replace('var(----border-top-left-radius)', `var(--${componentName}--border-top-left-radius, var(--border-top-left-radius))`)
            .replace('var(----border-top-right-radius)', `var(--${componentName}--border-top-right-radius, var(--border-top-right-radius))`)
            .replace('var(----border-bottom-right-radius)', `var(--${componentName}--border-bottom-right-radius, var(--border-bottom-right-radius))`)
            .replace('var(----border-bottom-left-radius)', `var(--${componentName}--border-bottom-left-radius, var(--border-bottom-left-radius))`)
            .replace('var(----border-radius)', `var(
${indent}${indent}--${componentName}--border-radius,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--border-top-left-radius, var(--border-top-left-radius))
${indent}${indent}${indent}var(--${componentName}--border-top-right-radius, var(--border-top-right-radius))
${indent}${indent}${indent}var(--${componentName}--border-bottom-right-radius, var(--border-bottom-right-radius))
${indent}${indent}${indent}var(--${componentName}--border-bottom-left-radius, var(--border-bottom-left-radius))
${indent}${indent})
${indent})`)
            .replace('var(----padding-top)', `var(--${componentName}--padding-top, var(--padding-top))`)
            .replace('var(----padding-right)', `var(--${componentName}--padding-right, var(--padding-right))`)
            .replace('var(----padding-bottom)', `var(--${componentName}--padding-bottom, var(--padding-bottom))`)
            .replace('var(----padding-left)', `var(--${componentName}--padding-left, var(--padding-left))`)
            .replace('var(----padding)', `var(
${indent}${indent}--${componentName}--padding,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--padding-top, var(--padding-top))
${indent}${indent}${indent}var(--${componentName}--padding-right, var(--padding-right))
${indent}${indent}${indent}var(--${componentName}--padding-bottom, var(--padding-bottom))
${indent}${indent}${indent}var(--${componentName}--padding-left, var(--padding-left))
${indent}${indent})
${indent})`)
            .replace('var(----margin-top)', `var(--${componentName}--margin-top, var(--margin-top))`)
            .replace('var(----margin-right)', `var(--${componentName}--margin-right, var(--margin-right))`)
            .replace('var(----margin-bottom)', `var(--${componentName}--margin-bottom, var(--margin-bottom))`)
            .replace('var(----margin-left)', `var(--${componentName}--margin-left, var(--margin-left))`)
            .replace('var(----margin)', `var(
${indent}${indent}--${componentName}--margin,
${indent}${indent}(
${indent}${indent}${indent}var(--${componentName}--margin-top, var(--margin-top))
${indent}${indent}${indent}var(--${componentName}--margin-right, var(--margin-right))
${indent}${indent}${indent}var(--${componentName}--margin-bottom, var(--margin-bottom))
${indent}${indent}${indent}var(--${componentName}--margin-left, var(--margin-left))
${indent}${indent})
${indent})`)
            .replace('var(----header--color)', `var(--${componentName}--header--color, var(--${componentName}--color))`)
            .replace('var(----body--color)', `var(--${componentName}--body--color, var(--${componentName}--color))`)
            .replace('var(----footer--color)', `var(--${componentName}--footer--color, var(--${componentName}--color))`)
            .replace('var(----header--background)', `var(--${componentName}--header--background, var(--${componentName}--background))`)
            .replace('var(----body--background)', `var(--${componentName}--body--background, var(--${componentName}--background))`)
            .replace('var(----footer--background)', `var(--${componentName}--footer--background, var(--${componentName}--background))`)
            .replace('var(----header--margin-bottom)', `var(--${componentName}--header--margin-bottom, var(--${componentName}--margin-bottom, var(--margin-bottom)))`)
            .replace('var(----footer--margin-top)', `var(--${componentName}--footer--margin-top, var(--${componentName}--margin-top, var(--margin-top)))`);
    }).join('\n');

    fs.writeFileSync(file, contents);
});

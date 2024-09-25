import { selector, file } from '@inkline/config';

export function useRebootTheme() {
    // Display block by default
    selector('label', {
        display: 'inline-block'
    });

    // Remove the default `border-radius` that macOS Chrome adds.
    selector('button', {
        borderRadius: 0
    });

    // Inherit font size and line height for form controls
    selector('input, button, select, optgroup, textarea', {
        fontSize: 'inherit',
        lineHeight: 'inherit'
    });

    // Explicitly remove focus outline in Chromium when it shouldn't be
    // visible (e.g. as result of mouse click or touch tap). It already
    // should be doing this automatically, but seems to currently be
    // confused and applies its very visible two-tone outline anyway.
    selector('button:focus:not(:focus-visible)', {
        outline: 0
    });

    // Set the cursor for non-`<button>` buttons
    selector('[role="button"]', {
        cursor: 'pointer'
    });

    // Remove the inheritance of word-wrap in Safari.
    selector('select', {
        wordWrap: 'normal'
    });

    // Remove the dropdown arrow only from text type inputs built with datalists in Chrome.
    // See https://stackoverflow.com/a/54997118
    selector(
        '[list]:not([type="date"], [type="datetime-local"], [type="month"], [type="week"], [type="time"])::-webkit-calendar-picker-indicator',
        {
            display: 'none !important'
        }
    );

    // Textareas should really only resize vertically so they don't break their (horizontal) containers.
    selector('textarea', {
        resize: 'vertical'
    });

    // Browsers set a default `min-width: min-content;` on fieldsets,
    // unlike e.g. `<div>`s, which have `min-width: 0;` by default.
    // So we reset that to ensure fieldsets behave more like a standard block element.
    // See https://github.com/twbs/bootstrap/issues/12359
    // and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements
    // Reset the default outline behavior of fieldsets so they don't affect page layout.
    selector('fieldset', {
        minWidth: 0,
        padding: 0,
        margin: 0,
        border: 0
    });

    // Fix height of inputs with a type of datetime-local, date, month, week, or time
    // See https://github.com/twbs/bootstrap/issues/18842
    selector(
        '::-webkit-datetime-edit-fields-wrapper, ::-webkit-datetime-edit-text, ::-webkit-datetime-edit-minute, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-year-field',
        {
            padding: 0
        }
    );

    selector('::-webkit-inner-spin-button', {
        height: 'auto'
    });

    // Correct the outline style in Safari.
    // Add rounded corners on search inputs in iOS
    selector('[type="search"]', {
        outlineOffset: '-2px',
        appearance: 'textfield'
    });

    // Remove the inner padding in Chrome and Safari on macOS.
    selector('::-webkit-search-decoration', {
        appearance: 'none'
    });

    // Remove padding around color pickers in webkit browsers
    selector('::-webkit-color-swatch-wrapper', {
        padding: 0
    });

    // Inherit font family and line height for file input buttons
    // Correct the inability to style clickable types in iOS and Safari.
    selector('::file-selector-button', {
        font: 'inherit',
        appearance: 'button'
    });

    // Always hide an element with the `hidden` HTML attribute.
    selector('[hidden]', {
        display: 'none !important'
    });

    /**
     * Reset some styles for tables
     */

    selector('table', {
        borderCollapse: 'collapse',
        captionSide: 'bottom'
    });

    selector('th', {
        textAlign: 'inherit'
    });

    selector('thead, tbody, tfoot, tr, td, th', {
        borderColor: 'inherit',
        borderWidth: 0,
        borderStyle: 'solid'
    });

    /**
     * Avoid 300ms click delay on touch devices that support the `touch-action` CSS property.
     *
     * In particular, unlike most other browsers, IE11+Edge on Windows 10 on touch devices and IE Mobile 10-11
     * DON'T remove the click delay when `<meta name='viewport' content='width=device-width'>` is present.
     * However, they DO support removing the click delay via `touch-action: manipulation`.
     * See:
     * https://getbootstrap.com/docs/4.0/content/reboot/#click-delay-optimization-for-touch
     * http://caniuse.com/#feat=css-touch-action
     * https://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay
     */

    selector(
        'a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea',
        {
            touchAction: 'manipulation'
        }
    );
}

export function useNormalizeTheme() {
    file('index.scss', `@import 'normalize.css';\n`, {
        prepend: true
    });

    useRebootTheme();
}

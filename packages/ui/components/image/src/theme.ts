import { defaultDefinitionOptions, DefinitionOptions, selector } from '@inkline/core';

export function useImageThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    /**
     * Fluid images
     */

    selector(
        '.image.-fluid',
        {
            // Override the height to auto, otherwise images will be stretched
            // when setting a width and height attribute on the img element.
            height: 'auto',
            // Set the width to always be container width
            width: '100%'
        },
        options
    );

    /**
     * Responsive images
     *
     * Ensure images don't scale beyond their parents. This is purposefully opt-in
     * via an explicit class rather than being the default for all `<img>` because
     * it can break third-party widgets (including Google Maps) which weren't
     * expecting the images within themselves to be involuntarily resized.
     */

    selector(
        '.image.-responsive',
        {
            // Override the height to auto, otherwise images will be stretched
            // when setting a width and height attribute on the img element.
            height: 'auto',
            maxWidth: '100%'
        },
        options
    );

    /**
     * Floating images
     *
     * Float an image to the left or right
     */

    selector(
        '.image.-float-left',
        {
            float: 'left'
        },
        options
    );

    selector(
        '.image.-float-right',
        {
            float: 'right'
        },
        options
    );

    // In Internet Explorer 10, SVG images with .-responsive are
    // disproportionately sized. This fix improperly sizes other image formats,
    // so Inkline will only apply it to svg extensions
    selector(
        '.image[src$=".svg"]',
        {
            width: '100% \\9'
        },
        options
    );
}

export function useImageTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useImageThemeSelectors(options);
}

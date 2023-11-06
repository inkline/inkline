import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IRenderResolver',
    props: [
        {
            name: 'data',
            type: ['String', 'Number', 'Boolean', 'RenderFunction'],
            default: "'",
            description:
                'The primitive or render function to render. It can accept either primitive types (String, Number, Boolean), a render function, or a Vue component.'
        },
        {
            name: 'ctx',
            type: ['Object'],
            default: '',
            description:
                'The context object that is passed to the component props, render function, or used for string interpolation.'
        },
        {
            name: 'tag',
            type: ['String'],
            default: '',
            description:
                'The HTML tag to use for rendering primitives. If not specified, no tag will be rendered.'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '',
        variables: []
    }
};

export default manifest;

const pages = [
    {
        id: 'docs.introduction.getting-started',
        title: 'Getting Started'
    },
    {
        id: 'docs.introduction.installation',
        title: 'Installation'
    },
    {
        id: 'docs.introduction.customization',
        title: 'Customization'
    },
    {
        id: 'docs.core.grid',
        title: 'Grid'
    },
    {
        id: 'docs.core.layout',
        title: 'Layout'
    },
    {
        id: 'docs.core.typography',
        title: 'Typography'
    },
    {
        id: 'docs.core.images',
        title: 'Images'
    },
    {
        id: 'docs.core.tables',
        title: 'Tables'
    },
    {
        id: 'docs.core.code',
        title: 'Code'
    },
    {
        id: 'docs.forms.checkbox',
        title: 'Checkbox'
    },
    {
        id: 'docs.forms.input',
        title: 'Input'
    },
    {
        id: 'docs.forms.input-number',
        title: 'Number Input'
    },
    {
        id: 'docs.forms.radio',
        title: 'Radio'
    },
    {
        id: 'docs.forms.select',
        title: 'Select'
    },
    {
        id: 'docs.forms.textarea',
        title: 'Textarea'
    },
    {
        id: 'docs.forms.form',
        title: 'Form'
    },
    {
        id: 'docs.forms.form-group',
        title: 'Form Group'
    },
    {
        id: 'docs.forms.form-label',
        title: 'Form Label'
    },
    {
        id: 'docs.forms.validation.installation',
        title: 'Installation'
    },
    {
        id: 'docs.forms.validation.schema',
        title: 'Schema'
    },
    {
        id: 'docs.forms.validation.validators',
        title: 'Validators'
    },
    {
        id: 'docs.forms.validation.methods',
        title: 'Methods'
    },
    {
        id: 'docs.components.alert',
        title: 'Alert'
    },
    {
        id: 'docs.components.badge',
        title: 'Badge'
    },
    {
        id: 'docs.components.breadcrumb',
        title: 'Breadcrumb'
    },
    {
        id: 'docs.components.button',
        title: 'Button'
    },
    {
        id: 'docs.components.button-group',
        title: 'Button Group'
    },
    {
        id: 'docs.components.card',
        title: 'Card'
    },
    {
        id: 'docs.components.collapsible',
        title: 'Collapsible'
    },
    {
        id: 'docs.components.dropdown',
        title: 'Dropdown'
    },
    {
        id: 'docs.components.header',
        title: 'Header'
    },
    {
        id: 'docs.components.icon',
        title: 'Icon'
    },
    {
        id: 'docs.components.list-group',
        title: 'List Group'
    },
    {
        id: 'docs.components.loader',
        title: 'Loader'
    },
    {
        id: 'docs.components.media',
        title: 'Media'
    },
    {
        id: 'docs.components.modal',
        title: 'Modal'
    },
    {
        id: 'docs.components.nav',
        title: 'Nav'
    },
    {
        id: 'docs.components.navbar',
        title: 'Navbar'
    },
    {
        id: 'docs.components.pagination',
        title: 'Pagination'
    },
    {
        id: 'docs.components.popover',
        title: 'Popover'
    },
    {
        id: 'docs.components.progress',
        title: 'Progress'
    },
    {
        id: 'docs.components.tooltip',
        title: 'Tooltip'
    },
    {
        id: 'docs.utilities.border',
        title: 'Border'
    },
    {
        id: 'docs.utilities.clearfix',
        title: 'Clearfix'
    },
    {
        id: 'docs.utilities.color',
        title: 'Color'
    },
    {
        id: 'docs.utilities.display',
        title: 'Display'
    },
    {
        id: 'docs.utilities.embed',
        title: 'Embed'
    },
    {
        id: 'docs.utilities.flex',
        title: 'Flex'
    },
    {
        id: 'docs.utilities.float',
        title: 'Float'
    },
    {
        id: 'docs.utilities.overflow',
        title: 'Overflow'
    },
    {
        id: 'docs.utilities.overlay',
        title: 'Overlay'
    },
    {
        id: 'docs.utilities.position',
        title: 'Position'
    },
    {
        id: 'docs.utilities.sizing',
        title: 'Sizing'
    },
    {
        id: 'docs.utilities.spacing',
        title: 'Spacing'
    },
    {
        id: 'docs.utilities.vertical-align',
        title: 'Vertical Align'
    },
    {
        id: 'docs.utilities.visibility',
        title: 'Visibility'
    }
];

module.exports = {
    byId: pages.reduce((acc, page) => {
        acc[page.id] = page;
        return acc;
    }, {}),
    allIds: pages.map((page) => page.id)
};

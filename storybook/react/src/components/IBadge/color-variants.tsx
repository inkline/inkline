import { Fragment, createElement as h } from 'react';
import { IBadge } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBadge {...props} color="primary">Primary</IBadge>

    <IBadge {...props} color="secondary">Secondary</IBadge>

    <IBadge {...props} color="light">Light</IBadge>

    <IBadge {...props} color="dark">Dark</IBadge>

    <IBadge {...props} color="info">Info</IBadge>

    <IBadge {...props} color="success">Success</IBadge>

    <IBadge {...props} color="warning">Warning</IBadge>

    <IBadge {...props} color="danger">Danger</IBadge>
</>;

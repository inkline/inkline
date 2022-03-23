import React from 'react';
import { IBadge } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBadge {...props} size="sm">Small</IBadge>

    <IBadge {...props} size="md">Medium</IBadge>

    <IBadge {...props} size="lg">Large</IBadge>
</>;

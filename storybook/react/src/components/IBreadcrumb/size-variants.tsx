import React from 'react';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBreadcrumb {...props} size="sm">
        <IBreadcrumbItem href="/">Sizes</IBreadcrumbItem>
        <IBreadcrumbItem active>Small</IBreadcrumbItem>
    </IBreadcrumb>

    <IBreadcrumb {...props} size="md">
        <IBreadcrumbItem href="/">Sizes</IBreadcrumbItem>
        <IBreadcrumbItem active>Medium</IBreadcrumbItem>
    </IBreadcrumb>

    <IBreadcrumb {...props} size="lg">
        <IBreadcrumbItem href="/">Sizes</IBreadcrumbItem>
        <IBreadcrumbItem active>Large</IBreadcrumbItem>
    </IBreadcrumb>
</>;

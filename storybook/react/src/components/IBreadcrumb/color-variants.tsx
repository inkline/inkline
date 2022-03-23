import React from 'react';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBreadcrumb {...props} color="light">
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem active>Light</IBreadcrumbItem>
    </IBreadcrumb>

    <IBreadcrumb {...props} color="dark">
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem active>Dark</IBreadcrumbItem>
    </IBreadcrumb>
</>;

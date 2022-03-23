import React from 'react';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBreadcrumb {...props}>
        <IBreadcrumbItem>Home</IBreadcrumbItem>
        <IBreadcrumbItem active>Breadcrumbs</IBreadcrumbItem>
    </IBreadcrumb>
</>;

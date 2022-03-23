import React from 'react';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default (props: any) => <>
    <IBreadcrumb {...props}>
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem to="/example">Library</IBreadcrumbItem>
        <IBreadcrumbItem>Example</IBreadcrumbItem>
        <IBreadcrumbItem active>Data</IBreadcrumbItem>
    </IBreadcrumb>
</>;

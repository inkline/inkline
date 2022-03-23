import React from 'react';
import { IBreadcrumb, IBreadcrumbItem } from '@inkline/inkline/components';

export default (props: any) => {
    const items = [
        { title: 'Home', href: '/' },
        { title: 'Components', to: '/example' },
        { title: 'Breadcrumbs', active: true }
    ];

    return <>
        <IBreadcrumb {...props}>
            { items.map((item) =>
                <IBreadcrumbItem {...item} key={item.title}>
                    {item.title}
                </IBreadcrumbItem>)
            }
        </IBreadcrumb>
    </>;
};

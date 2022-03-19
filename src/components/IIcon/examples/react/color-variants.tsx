import React from 'react';
import { IIcon } from '@inkline/inkline/components';

export default (props: any) => <>
    <IIcon name="ink-check" className="_color:primary" {...props} />

    <IIcon name="ink-check" className="_color:secondary" {...props} />

    <IIcon name="ink-check" className="_color:info" {...props} />

    <IIcon name="ink-check" className="_color:success" {...props} />

    <IIcon name="ink-check" className="_color:warning" {...props} />

    <IIcon name="ink-check" className="_color:danger" {...props} />
</>;

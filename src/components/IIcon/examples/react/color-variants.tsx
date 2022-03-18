import React from 'react';
import { IIcon } from '@inkline/inkline/components';

export default (props: any) => <>
    <IIcon name="ink-check" class="_color:primary" {...props} />

    <IIcon name="ink-check" class="_color:secondary" {...props} />

    <IIcon name="ink-check" class="_color:info" {...props} />

    <IIcon name="ink-check" class="_color:success" {...props} />

    <IIcon name="ink-check" class="_color:warning" {...props} />

    <IIcon name="ink-check" class="_color:danger" {...props} />
</>;

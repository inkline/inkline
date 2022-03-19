import React from 'react';
import { IAlert, IIcon } from '@inkline/inkline/components';

export default (props: any) => <>
    <IAlert color="info" {...props}>
        <IAlert.Icon>
            <IIcon name="ink-info" />
        </IAlert.Icon>
        <p>Some quick example text to build on the alert title and make up the bulk of the alert's content.</p>
    </IAlert>
</>;

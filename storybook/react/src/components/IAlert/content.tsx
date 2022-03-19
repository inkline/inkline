import React from 'react';
import { IAlert, IIcon } from '@inkline/inkline/components';

export default (props: any) => <>
    <IAlert {...props}>
        <IAlert.Icon>
            <IIcon name="ink-info" size="lg" />
        </IAlert.Icon>
        <h4 className="_margin-bottom:0">Alert Title</h4>
        <p className="_margin-top:0">
            Some quick example text to build on the alert and make up the bulk of the alert's content.
        </p>
    </IAlert>
</>;

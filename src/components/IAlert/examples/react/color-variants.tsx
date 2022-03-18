import React from 'react';
import { IAlert, IIcon } from '@inkline/inkline/components';

export default (props: any) => <>
    <IAlert color="info">
        <IAlert.Icon>
            <IIcon name="ink-info" />
        </IAlert.Icon>
        <p>Heads up! This alert needs your attention, but it's not super important.</p>
    </IAlert>

    <IAlert color="success">
        <IAlert.Icon>
            <IIcon name="ink-check" />
        </IAlert.Icon>
        <p>Well done! You successfully read this important alert message.</p>
    </IAlert>

    <IAlert color="warning">
        <IAlert.Icon>
            <IIcon name="ink-warning" />
        </IAlert.Icon>
        <p>Warning! Better check yourself, you're not looking too good.</p>
    </IAlert>

    <IAlert color="danger">
        <IAlert.Icon>
            <IIcon name="ink-danger" />
        </IAlert.Icon>
        <p>Oh snap! Change a few things up and try submitting again.</p>
    </IAlert>
</>;

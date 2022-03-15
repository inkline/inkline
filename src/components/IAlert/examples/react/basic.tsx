import React from 'react';
import { IAlert } from '@inkline/inkline/components';

export default (props: any) => <>
    <IAlert {...props}>
        <IAlert.Icon>
            <span />
        </IAlert.Icon>
        <p>Heads up! This alert needs your attention, and it might be <a href="">important</a>.</p>
    </IAlert>
</>;

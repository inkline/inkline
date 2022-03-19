import React from 'react';
import { IAlert } from '@inkline/inkline/components';

export default (props: any) => <>
    <IAlert {...props} size="sm">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </IAlert>

    <IAlert {...props} size="md">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </IAlert>

    <IAlert {...props} size="lg">
        Some quick example text to build on the alert title and make up the bulk of the alert's content.
    </IAlert>
</>;

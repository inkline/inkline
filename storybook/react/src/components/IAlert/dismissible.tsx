import React, { useState } from 'react';
import { IAlert } from '@inkline/inkline/components';

export default (props: any) => {
    const [visible, setVisible] = useState(true);

    return <>
        <IAlert dismissible value={visible} onChange={setVisible} {...props}>
            <p>Whoa! Nicely done.</p>
        </IAlert>
    </>;
};

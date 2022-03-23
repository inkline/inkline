import React, { useState } from 'react';
import { IAlert } from '@inkline/inkline';

export function Example () {
    const [visible, setVisible] = useState(true);

    return <IAlert dismissible value={visible} onChange={setVisible}>
        <p>Whoa! Nicely done.</p>
    </IAlert>;
}

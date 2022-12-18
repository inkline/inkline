<template>
    <IAlert color="info">
        <template #icon>
            <IIcon name="ink-info" />
        </template>
        <p>Heads up! This alert needs your attention, but it's not super important.</p>
    </IAlert>

    <IAlert color="success">
        <template #icon>
            <IIcon name="ink-check" />
        </template>
        <p>Well done! You successfully read this important alert message.</p>
    </IAlert>

    <IAlert color="warning">
        <template #icon>
            <IIcon name="ink-warning" />
        </template>
        <p>Warning! Better check yourself, you're not looking too good.</p>
    </IAlert>

    <IAlert color="danger">
        <template #icon>
            <IIcon name="ink-danger" />
        </template>
        <p>Oh snap! Change a few things up and try submitting again.</p>
    </IAlert>
</template>

<template>
    <IAlert color="info">
        <template #icon>
            <IIcon name="ink-info" />
        </template>
        Heads up! This alert needs your attention, but it's not super important.
    </IAlert>

    <IAlert color="success">
        <template #icon>
            <IIcon name="ink-check" />
        </template>
        Well done! You successfully read this important alert message.
    </IAlert>

    <IAlert color="warning">
        <template #icon>
            <IIcon name="ink-warning" />
        </template>
        Warning! Better check yourself, you're not looking too good.
    </IAlert>

    <IAlert color="danger">
        <template #icon>
            <IIcon name="ink-danger" />
        </template>
        Oh snap! Change a few things up and try submitting again.
    </IAlert>
</template>

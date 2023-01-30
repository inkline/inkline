<template>
    <IToast color="light">
        <template #icon>
            <IIcon name="ink-circle" />
        </template>
        <p>Heads up! This toast needs your attention, but it's not super important.</p>
    </IToast>

    <IToast color="dark">
        <template #icon>
            <IIcon name="ink-circle" />
        </template>
        <p>Heads up! This toast needs your attention, but it's not super important.</p>
    </IToast>

    <IToast color="info">
        <template #icon>
            <IIcon name="ink-info" />
        </template>
        <p>Heads up! This toast needs your attention, but it's not super important.</p>
    </IToast>

    <IToast color="success">
        <template #icon>
            <IIcon name="ink-check" />
        </template>
        <p>Well done! You successfully read this important toast message.</p>
    </IToast>

    <IToast color="warning">
        <template #icon>
            <IIcon name="ink-warning" />
        </template>
        <p>Warning! Better check yourself, you're not looking too good.</p>
    </IToast>

    <IToast color="danger">
        <template #icon>
            <IIcon name="ink-danger" />
        </template>
        <p>Oh snap! Change a few things up and try submitting again.</p>
    </IToast>
</template>

<template>
    <Alert color="info">
        <template #icon>
            <Icon name="ink-info" />
        </template>
        Heads up! This alert needs your attention, but it's not super important.
    </Alert>

    <Alert color="success">
        <template #icon>
            <Icon name="ink-check" />
        </template>
        Well done! You successfully read this important alert message.
    </Alert>

    <Alert color="warning">
        <template #icon>
            <Icon name="ink-warning" />
        </template>
        Warning! Better check yourself, you're not looking too good.
    </Alert>

    <Alert color="danger">
        <template #icon>
            <Icon name="ink-danger" />
        </template>
        Oh snap! Change a few things up and try submitting again.
    </Alert>
</template>

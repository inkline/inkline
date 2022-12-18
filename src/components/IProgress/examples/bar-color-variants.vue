<template>
    <IProgress>
        <IProgressBar color="primary" :value="65" />
    </IProgress>

    <IProgress>
        <IProgressBar color="secondary" :value="65" />
    </IProgress>

    <IProgress>
        <IProgressBar color="info" :value="65" />
    </IProgress>

    <IProgress>
        <IProgressBar color="success" :value="65" />
    </IProgress>

    <IProgress>
        <IProgressBar color="warning" :value="65" />
    </IProgress>

    <IProgress>
        <IProgressBar color="danger" :value="65" />
    </IProgress>

    <IProgress color="light">
        <IProgressBar color="dark" :value="65" />
    </IProgress>

    <IProgress color="dark">
        <IProgressBar color="light" :value="65" />
    </IProgress>
</template>

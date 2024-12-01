<template>
    <Progress>
        <ProgressBar color="primary" :value="65" />
    </Progress>

    <Progress>
        <ProgressBar color="secondary" :value="65" />
    </Progress>

    <Progress>
        <ProgressBar color="info" :value="65" />
    </Progress>

    <Progress>
        <ProgressBar color="success" :value="65" />
    </Progress>

    <Progress>
        <ProgressBar color="warning" :value="65" />
    </Progress>

    <Progress>
        <ProgressBar color="danger" :value="65" />
    </Progress>

    <Progress color="light">
        <ProgressBar color="dark" :value="65" />
    </Progress>

    <Progress color="dark">
        <ProgressBar color="light" :value="65" />
    </Progress>
</template>

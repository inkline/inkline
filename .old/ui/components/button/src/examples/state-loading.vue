<template>
    <Button :loading="true" square> Default Button</Button>

    <Button :loading="true">
        Default Button
        <template #loading> Loading...</template>
    </Button>

    <Button :loading="true">
        Default Button
        <template #loading-icon>
            <Loader color="primary" class="_margin-right:1/2" />
        </template>
        <template #loading> Loading with Custom Icon...</template>
    </Button>
</template>

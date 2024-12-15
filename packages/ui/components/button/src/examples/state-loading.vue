<template>
    <Button :loading="true"> Default Button </Button>

    <Button :loading="true">
        Default Button
        <template #loading> Loading... </template>
    </Button>

    <Button :loading="true" :show-loading-icon="false">
        Default Button
        <template #loading>
            <Loader color="primary" class="_margin-right:1/2" />
            Loading with Custom Icon...
        </template>
    </Button>
</template>
<script setup></script>

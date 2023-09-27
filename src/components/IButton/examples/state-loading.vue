<template>
    <IButton :loading="true"> Default Button </IButton>

    <IButton :loading="true">
        Default Button
        <template #loading> Loading... </template>
    </IButton>

    <IButton :loading="true" :show-loading-icon="false">
        Default Button
        <template #loading>
            <ILoader color="primary" class="_margin-right:1/2" />
            Loading with Custom Icon...
        </template>
    </IButton>
</template>
<script setup></script>

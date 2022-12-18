<template>
    <IButton :loading="true"> Disabled Default Button </IButton>

    <IButton :loading="true">
        Button
        <template #loading>
            <ILoader color="dark" class="_margin-right:1/2" />
            Loading
        </template>
    </IButton>
</template>

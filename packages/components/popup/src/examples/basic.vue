<template>
    <Popup>
        <template #trigger="{ props }">
            <Button v-bind="props">Trigger</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Popup</div>
        </template>
    </Popup>
</template>

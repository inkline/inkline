<template>
    <Popup placement="top">
        <template #trigger="{ props }">
            <Button v-bind="props">Top Trigger</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Top Popup</div>
        </template>
    </Popup>

    <Popup placement="right">
        <template #trigger="{ props }">
            <Button v-bind="props">Right Trigger</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Right Popup</div>
        </template>
    </Popup>

    <Popup placement="bottom">
        <template #trigger="{ props }">
            <Button v-bind="props">Bottom Trigger</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Bottom Popup</div>
        </template>
    </Popup>

    <Popup placement="left">
        <template #trigger="{ props }">
            <Button v-bind="props">Left Trigger</Button>
        </template>
        <template #popup="{ props, visible }">
            <div class="popup" v-bind="props" v-show="visible">Left Popup</div>
        </template>
    </Popup>
</template>

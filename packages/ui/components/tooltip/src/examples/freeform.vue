<template>
    <Tooltip>
        <template #trigger="{ props }">
            <Button v-bind="props">Normal Tooltip</Button>
        </template>
        <template #content>
            This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is not
            controlled.
        </template>
    </Tooltip>

    <Tooltip>
        <template #trigger="{ props }">
            <Button v-bind="props">Fixed Width Tooltip</Button>
        </template>
        <template #content>
            <div class="_xs:justify-content:center" style="white-space: normal; width: 240px">
                This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is
                controlled.
            </div>
        </template>
    </Tooltip>
</template>

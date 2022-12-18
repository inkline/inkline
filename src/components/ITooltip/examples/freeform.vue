<template>
    <ITooltip>
        <IButton>Normal Tooltip</IButton>
        <template #body>
            This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is not
            controlled.
        </template>
    </ITooltip>

    <ITooltip>
        <IButton>Fixed Width Tooltip</IButton>
        <template #body>
            <div class="_xs:justify-content:center" style="white-space: normal; width: 240px">
                This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is
                controlled.
            </div>
        </template>
    </ITooltip>
</template>

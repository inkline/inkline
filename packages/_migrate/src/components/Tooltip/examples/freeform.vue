<template>
    <Tooltip>
        <Button>Normal Tooltip</Button>
        <template #body>
            This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is not
            controlled.
        </template>
    </Tooltip>

    <Tooltip>
        <Button>Fixed Width Tooltip</Button>
        <template #body>
            <div class="_xs:justify-content:center" style="white-space: normal; width: 240px">
                This is a <strong>freeform tooltip</strong> with a <u>long text</u>. Its width is
                controlled.
            </div>
        </template>
    </Tooltip>
</template>

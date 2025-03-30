<template>
    <Popover>
        <template #trigger="{ props }">
            <Button v-bind="props">Popover</Button>
        </template>
        <PopoverHeader>Popover Header</PopoverHeader>
        This is the popover body. Useful information goes here.
        <PopoverFooter>Popover Footer</PopoverFooter>
    </Popover>
</template>

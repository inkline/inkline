<template>
    <div class="_display:flex!">
        <div>Flex Item 1</div>
        <div>Flex Item 2</div>
        <div>Flex Item 3</div>
        <div class="_order:first!">Flex Item 4</div>
    </div>

    <div class="_display:flex!">
        <div class="_order:last!">Flex Item 1</div>
        <div>Flex Item 2</div>
        <div>Flex Item 3</div>
        <div>Flex Item 4</div>
    </div>

    <div class="_display:flex!">
        <div class="_order:4!">Flex Item 1</div>
        <div class="_order:3!">Flex Item 2</div>
        <div class="_order:2!">Flex Item 3</div>
        <div class="_order:1!">Flex Item 4</div>
    </div>
</template>

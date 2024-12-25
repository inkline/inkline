<template>
    <ListGroup>
        <ListGroupItem :to="{ path: '/' }" exact-active-class="-active">
            Active Router Link
        </ListGroupItem>
        <ListGroupItem :to="{ path: '/' }" active> Active Item </ListGroupItem>
    </ListGroup>
</template>

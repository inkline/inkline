<template>
    <ListGroup>
        <ListGroupItem active>Active</ListGroupItem>
        <ListGroupItem href="https://inkline.io">Link</ListGroupItem>
        <ListGroupItem :to="{ path: '/' }">Router Link</ListGroupItem>
        <ListGroupItem>Item</ListGroupItem>
        <ListGroupItem disabled>Disabled</ListGroupItem>
    </ListGroup>
</template>

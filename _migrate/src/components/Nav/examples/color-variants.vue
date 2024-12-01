<template>
    <Nav color="light" class="_background:light">
        <NavItem href="https://inkline.io">Link</NavItem>
        <NavItem :to="{ path: '/' }">Router Link</NavItem>
        <NavItem>Item</NavItem>
        <NavItem>Item</NavItem>
        <NavItem disabled>Disabled</NavItem>
    </Nav>

    <Nav color="dark" class="_background:dark">
        <NavItem href="https://inkline.io">Link</NavItem>
        <NavItem :to="{ path: '/' }">Router Link</NavItem>
        <NavItem>Item</NavItem>
        <NavItem>Item</NavItem>
        <NavItem disabled>Disabled</NavItem>
    </Nav>
</template>

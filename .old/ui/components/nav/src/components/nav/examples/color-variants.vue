<template>
    <Nav color="light">
        <NavItem href="https://inkline.io">Link</NavItem>
        <NavItem :to="{ path: '/' }">Router Link</NavItem>
        <NavItem>Item</NavItem>
        <NavItem>Item</NavItem>
        <NavItem disabled>Disabled</NavItem>
    </Nav>

    <Nav color="dark">
        <NavItem href="https://inkline.io">Link</NavItem>
        <NavItem :to="{ path: '/' }">Router Link</NavItem>
        <NavItem>Item</NavItem>
        <NavItem>Item</NavItem>
        <NavItem disabled>Disabled</NavItem>
    </Nav>
</template>

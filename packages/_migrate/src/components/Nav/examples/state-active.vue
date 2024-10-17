<template>
    <Nav>
        <NavItem :to="{ path: '/' }" exact-active-class="-active"> Active Router Link </NavItem>
        <NavItem active> Active Item </NavItem>
    </Nav>
</template>

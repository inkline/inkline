<template>
    <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem :to="{ path: '/' }">Library</BreadcrumbItem>
        <BreadcrumbItem>Example</BreadcrumbItem>
        <BreadcrumbItem active>Data</BreadcrumbItem>
    </Breadcrumb>
</template>

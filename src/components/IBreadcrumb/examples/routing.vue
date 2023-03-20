<template>
    <IBreadcrumb>
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem :to="{ path: '/docs/components/breadcrumb' }">Library</IBreadcrumbItem>
        <IBreadcrumbItem>Example</IBreadcrumbItem>
        <IBreadcrumbItem active>Data</IBreadcrumbItem>
    </IBreadcrumb>
</template>

<template>
    <IBreadcrumb>
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem :to="{ path: '/' }">Library</IBreadcrumbItem>
        <IBreadcrumbItem>Example</IBreadcrumbItem>
        <IBreadcrumbItem active>Data</IBreadcrumbItem>
    </IBreadcrumb>
</template>

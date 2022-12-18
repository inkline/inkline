<template>
    <IBreadcrumb>
        <IBreadcrumbItem href="/">Home</IBreadcrumbItem>
        <IBreadcrumbItem :to="{ name: 'docs' }">Library</IBreadcrumbItem>
        <IBreadcrumbItem>Example</IBreadcrumbItem>
        <IBreadcrumbItem active>Data</IBreadcrumbItem>
    </IBreadcrumb>
</template>

import type { Component } from 'vue';
import { Alert } from '@inkline/component-alert';
import { Badge } from '@inkline/component-badge';
import { Breadcrumb, BreadcrumbItem } from '@inkline/component-breadcrumb';
import { Button } from '@inkline/component-button';
import { Loader } from '@inkline/component-loader';

export const components: Record<string, Component> = {
    Alert,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Loader
};

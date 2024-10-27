import type { Component } from 'vue';
import { Alert } from '@inkline/component-alert';
import { Badge } from '@inkline/component-badge';
import { Breadcrumb, BreadcrumbItem } from '@inkline/component-breadcrumb';
import { Button } from '@inkline/component-button';
import { ButtonGroup } from '@inkline/component-button-group';
import { Card } from '@inkline/component-card';
import { Loader } from '@inkline/component-loader';
import { Popover } from '@inkline/component-popover';
import { Popup } from '@inkline/component-popup';
import { Tooltip } from '@inkline/component-tooltip';

export const components: Record<string, Component> = {
    Alert,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Loader,
    Popover,
    Popup,
    Tooltip
};

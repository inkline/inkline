<script lang="ts" setup>
import { useToast, useModal } from 'inkline';

const toast = useToast();
const modal = useModal();

async function showConfirm() {
    const confirmed = await modal.confirm({
        title: 'Confirm',
        message: 'Are you sure you want to delete this item?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
    });

    if (confirmed) {
        toast.show({
            message: 'Item deleted successfully',
            color: 'success'
        });
    }
}
</script>
<template>
    <Button @click="showConfirm">Show confirm</Button>
</template>

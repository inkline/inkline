<script lang="ts" setup>
import { ref } from 'vue';

const primary = ref(false);
const secondary = ref(false);
const light = ref(false);
const dark = ref(false);
const info = ref(false);
const success = ref(false);
const warning = ref(false);
const danger = ref(false);
</script>

<template>
    <Button color="primary" @click="primary = true"> Show Primary Modal</Button>

    <Modal v-model="primary" color="primary">
        <template #header> Primary Modal</template>
        <template #icon>
            <Icon name="ink:check" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="secondary" @click="secondary = true"> Show Secondary Modal</Button>

    <Modal v-model="secondary" color="secondary">
        <template #header> Secondary Modal</template>
        <template #icon>
            <Icon name="ink:check" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="light" @click="light = true"> Show Light Modal</Button>

    <Modal v-model="light" color="light">
        <template #header> Light Modal</template>
        <template #icon>
            <Icon name="ink:check" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="dark" @click="dark = true"> Show Dark Modal</Button>

    <Modal v-model="dark" color="dark">
        <template #header> Dark Modal</template>
        <template #icon>
            <Icon name="ink:check" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="info" @click="info = true"> Show Info Modal</Button>

    <Modal v-model="info" color="info">
        <template #header> Info Modal</template>
        <template #icon>
            <Icon name="ink:info" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="success" @click="success = true"> Show Success Modal</Button>

    <Modal v-model="success" color="success">
        <template #header> Success Modal</template>
        <template #icon>
            <Icon name="ink:check" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="warning" @click="warning = true"> Show Warning Modal</Button>

    <Modal v-model="warning" color="warning">
        <template #header> Warning Modal</template>
        <template #icon>
            <Icon name="ink:warning" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>

    <Button color="danger" @click="danger = true"> Show Danger Modal</Button>

    <Modal v-model="danger" color="danger">
        <template #header> Danger Modal</template>
        <template #icon>
            <Icon name="ink:danger" />
        </template>
        This is the modal body. Useful information goes here.
        <template #footer> Modal Footer</template>
    </Modal>
</template>

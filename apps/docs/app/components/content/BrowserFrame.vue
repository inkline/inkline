<script setup lang="ts">
// A captioned frame around a `StorybookEmbed`. It stands in for the
// `BrowserFrame` that `@uxfront/layer-docs` 0.4.1 shipped: neither 0.7.1 nor
// Docus has one.
defineProps<{ title?: string }>();
</script>

<template>
  <div class="p-1 border border-default rounded text-sm bg-default/70">
    <div v-if="title" class="flex items-center bg-elevated p-2 rounded font-bold">
      <span class="flex gap-1 absolute">
        <span class="rounded-full bg-error inline-flex w-3 h-3" />
        <span class="rounded-full bg-warning inline-flex w-3 h-3" />
        <span class="rounded-full bg-success inline-flex w-3 h-3" />
      </span>
      <span class="flex w-full justify-center">
        {{ title }}
      </span>
    </div>
    <div class="px-3 overflow-auto">
      <slot mdc-unwrap="p" />
    </div>
  </div>
</template>

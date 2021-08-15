<template>
    <i-list-group class="integrations-list">
        <i-list-group-item v-for="iconPack in iconPacks" :key="iconPack.name" class="integrations-item" tag="div">
            <div class="meta">
                <div class="title">
                    <small class="_text:muted">Icon Pack</small>
                    <a :href="iconPack.url" rel="nofollow" target="_blank">
                        {{ iconPack.title }}
                    </a>
                </div>

                <div class="license">
                    <small class="_text:muted">License</small>
                    <a :href="iconPack.license.url" rel="nofollow" target="_blank">
                        {{ iconPack.license.title }}
                    </a>
                </div>
            </div>

            <ul>
                <li v-for="iconPackVariant in iconPack.variants" :key="iconPackVariant.name">
                    <div>
                        <small class="_text:muted">Prefix</small>
                        <strong>{{ iconPackVariant.prefix }}</strong>
                    </div>
                    <div v-if="iconPack.variants.length > 1">
                        <small class="_text:muted">Import</small>
                        <code>@inkline/icons/packs/{{ iconPack.name }}/{{ iconPackVariant.name }}</code>
                    </div>
                    <div v-else>
                        <small class="_text:muted">Import</small>
                        <code>@inkline/icons/packs/{{ iconPack.name }}</code>
                    </div>
                </li>
                <li v-if="iconPack.variants.length > 1">
                    <div>
                        <small class="_text:muted">Prefix</small>
                        <strong>*</strong>
                    </div>
                    <div>
                        <small class="_text:muted">Import</small>
                        <code>@inkline/icons/packs/{{ iconPack.name }}</code>
                    </div>
                </li>
            </ul>
        </i-list-group-item>
    </i-list-group>
</template>

<script>
import { iconPacks } from '@inkline/icons/config';

export default {
    data() {
        return {
            iconPacks
        };
    }
};
</script>

<style lang="scss">
@import '../../../css/variables';

.integrations-list {
    .integrations-item {
        overflow: auto;

        .meta {
            display: flex;
            justify-content: space-between;

            .title,
            .license {
                display: flex;
                flex-direction: column;
            }

            .title {
                font-weight: font-weight('semibold');
            }

            .license {
                text-align: right;
            }
        }

        ul {
            margin-top: spacing();
            padding-left: 0;

            li {
                display: flex;

                div {
                    display: flex;
                    flex-direction: column;
                    margin-right: spacing('2');
                }
            }
        }
    }
}
</style>

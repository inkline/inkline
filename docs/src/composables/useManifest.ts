import type { ComponentManifest } from 'inkline';
import { onMounted, ref, unref } from 'vue';

const manifestCache = new Map<string, ComponentManifest[]>();

async function loadManifest(
    packageName: string,
    loader: () => Promise<{ default: ComponentManifest[] }>
) {
    if (!manifestCache.has(packageName)) {
        const manifestModule = await loader();
        manifestCache.set(packageName, manifestModule.default);
        return manifestModule.default;
    }

    return manifestCache.get(packageName) ?? [];
}

export function useManifest(packageName: MaybeRef<string>, componentName: MaybeRef<string>) {
    const manifest = ref<ComponentManifest | undefined>();

    onMounted(async () => {
        let manifests = manifestCache.get(unref(packageName));
        if (!manifests) {
            manifests = await loadManifest(
                unref(packageName),
                async () =>
                    import(`../../../packages/ui/components/${unref(packageName)}/src/manifest.ts`)
            );
        }

        manifest.value = manifests.find((m) => m.name === unref(componentName));
    });

    return { manifest };
}

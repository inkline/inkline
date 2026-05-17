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

export function useManifest(packageNameRef: MaybeRef<string>, componentNameRef: MaybeRef<string>) {
    const manifest = ref<ComponentManifest | undefined>();

    onMounted(async () => {
        const packageName = unref(packageNameRef);
        const componentPath = packageName.replace('@inkline/component-', '');
        let manifests = manifestCache.get(packageName);
        if (!manifests) {
            manifests = await loadManifest(
                packageName,
                async () =>
                    import(`../../../packages/ui/components/${componentPath}/src/manifest.ts`)
            );
        }

        manifest.value = manifests.find((m) => m.name === unref(componentNameRef));
    });

    return { manifest };
}

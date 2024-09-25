import { UnoGenerator, Preset } from "unocss";
import type { ResolvedTheme } from "@inkline/config";
import { PresetMediaQueryMatcher } from "../types";

export function getInklinePresetFromGenerator(
    generator: UnoGenerator,
): Preset<ResolvedTheme> {
    const presets = generator.userConfig.presets as Preset<ResolvedTheme>[];

    return presets.find((preset) => preset.name === "@inkline/unocss")!;
}

export function getPrefixFromGenerator(generator: UnoGenerator): string {
    const inklinePreset = getInklinePresetFromGenerator(generator);

    return (inklinePreset.prefix as string) || "";
}

export function getMediaFromGenerator(
    generator: UnoGenerator,
): PresetMediaQueryMatcher[] {
    const inklinePreset = getInklinePresetFromGenerator(generator);

    return inklinePreset.options.media || [];
}

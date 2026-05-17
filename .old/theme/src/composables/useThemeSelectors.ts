import {
    useFluidTheme,
    useATheme,
    useAbbrTheme,
    useAddressTheme,
    useBodyTheme,
    useCaptionTheme,
    useCodeTheme,
    useDisplayTheme,
    useDlTheme,
    useHeadingTheme,
    useHrTheme,
    useIframeTheme,
    useImgTheme,
    useKbdTheme,
    useLegendTheme,
    useMarkTheme,
    useOlTheme,
    useOutputTheme,
    useParagraphTheme,
    usePreTheme,
    useSampTheme,
    useSummaryTheme,
    useUlTheme,
    useTransitionsTheme,
    useUtilities
} from '../selectors';
import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';

export function useThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useFluidTheme(options);
    useATheme(options);
    useAbbrTheme(options);
    useAddressTheme(options);
    useBodyTheme(options);
    useCaptionTheme(options);
    useCodeTheme(options);
    useDisplayTheme(options);
    useDlTheme(options);
    useHeadingTheme(options);
    useHrTheme(options);
    useIframeTheme(options);
    useImgTheme(options);
    useKbdTheme(options);
    useLegendTheme(options);
    useMarkTheme(options);
    useOlTheme(options);
    useOutputTheme(options);
    useParagraphTheme(options);
    usePreTheme(options);
    useSampTheme(options);
    useSummaryTheme(options);
    useUlTheme(options);
    useTransitionsTheme(options);
    useUtilities(options);
}

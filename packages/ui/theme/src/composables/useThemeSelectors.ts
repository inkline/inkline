import {
    useNormalizeTheme,
    useFluidTheme,
    useATheme,
    useAbbrTheme,
    useAddressTheme,
    useBlockquoteTheme,
    useBodyTheme,
    useCaptionTheme,
    useCodeTheme,
    useDisplayTheme,
    useDlTheme,
    useHeadingTheme,
    useHrTheme,
    useIframeTheme,
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
    useTransitionsTheme
} from '../selectors';
import { DefinitionOptions } from '@inkline/core';

export function useThemeSelectors(options: DefinitionOptions) {
    useNormalizeTheme(options);
    useFluidTheme(options);
    useATheme(options);
    useAbbrTheme(options);
    useAddressTheme(options);
    useBlockquoteTheme(options);
    useBodyTheme(options);
    useCaptionTheme(options);
    useCodeTheme(options);
    useDisplayTheme(options);
    useDlTheme(options);
    useHeadingTheme(options);
    useHrTheme(options);
    useIframeTheme(options);
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
}

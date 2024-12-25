import { useThemeVariables } from "./useThemeVariables";
import { useThemeSelectors } from "./useThemeSelectors";

export function useTheme() {
    useThemeVariables();
    useThemeSelectors();
}

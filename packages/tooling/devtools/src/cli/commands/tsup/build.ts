import { exec } from "../../utils";

export function tsupBuild() {
    exec("tsc --noEmit");
    exec("tsup");
}

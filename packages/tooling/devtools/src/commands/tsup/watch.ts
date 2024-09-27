import { exec } from "../../utils";

export function tsupWatch() {
    exec("tsup --watch");
}

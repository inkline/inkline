declare module '@npmcli/promise-spawn' {
    export default function spawn(
        cmd: string,
        argv: string[],
        options: { stdio: 'inherit' }
    ): Promise<void>;
}

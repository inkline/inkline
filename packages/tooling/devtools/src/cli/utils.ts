import spawn from '@npmcli/promise-spawn';

export async function exec(command: string) {
    const argv = command.split(' ');
    const cmd = argv.shift();

    if (!cmd) {
        throw new Error(`Invalid command: ${command}`);
    }

    await spawn(cmd, argv, { stdio: 'inherit' });
}

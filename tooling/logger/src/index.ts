import chalk from 'chalk';
import util from 'util';

function processMessage(message: unknown) {
    if (typeof message === 'string') {
        return message;
    }

    return util.inspect(message, { colors: true, depth: null });
}

export const Logger = {
    error: (message: unknown) => console.log(chalk.red(`[x] ${processMessage(message)}`)),
    success: (message: unknown) => console.log(chalk.green(`[✓] ${processMessage(message)}`)),
    warning: (message: unknown) => console.log(chalk.yellow(`[⚠] ${processMessage(message)}`)),
    info: (message: unknown) => console.log(chalk.blue(`[i] ${processMessage(message)}`)),
    default: (message: unknown) => console.log(`[·] ${processMessage(message)}`),
    log: (...message: unknown[]) => console.log(...message.map(processMessage))
};

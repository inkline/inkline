import chalk from 'chalk';

export const Logger = {
    error: (message: string) => console.log(chalk.red(`[x] ${message}`)),
    success: (message: string) => console.log(chalk.green(`[✓] ${message}`)),
    warning: (message: string) => console.log(chalk.yellow(`[⚠] ${message}`)),
    info: (message: string) => console.log(chalk.blue(`[i] ${message}`)),
    default: (message: string) => console.log(`[·] ${message}`),
    log: (...message: any) => console.log(...message)
};

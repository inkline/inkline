import chalk from 'chalk';
export var Logger = {
    error: function (message) { return console.log(chalk.red("[x] ".concat(message))); },
    success: function (message) { return console.log(chalk.green("[\u2713] ".concat(message))); },
    warning: function (message) { return console.log(chalk.yellow("[\u26A0] ".concat(message))); },
    info: function (message) { return console.log(chalk.blue("[i] ".concat(message))); },
    default: function (message) { return console.log("[\u00B7] ".concat(message)); },
    log: function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        return console.log.apply(console, message);
    }
};

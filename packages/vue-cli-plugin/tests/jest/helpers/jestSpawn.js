const spawn = require('child_process').spawn;

const processError = (stderr) => stderr.toString().replace('-  Building for production...\n', '');

export const jestSpawn = async (command, args, options, callback, done) => {
    const child = spawn(command, args, options);
    let stdout = '';
    let stderr = '';

    // add a 'data' event listener for the spawn instance
    child.stdout.on('data', (data) => {
        stdout += data.toString();
    });

    // add a 'data' event listener for the spawn instance
    child.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    // when the spawn child process exits, check if there were any errors and close the writeable stream
    child.on('exit', (code) => {
        stderr = processError(stderr);

        console.log(stdout);

        if (code !== 0 || stderr) {
            done.fail(stderr);
        }

        if (callback) {
            callback();
        }

        done();
    });
};

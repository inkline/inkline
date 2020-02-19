const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const jestExec = (command, options, callback) => async (done) => {
    try {
        const { stdout, stderr } = await exec(command, options);

        console.log(stdout);

        if (stderr) {
            done.fail(stderr);
        }
    } catch (e) {
        done.fail(e);
    }

   if (callback) {
       callback();
   }

    done();
};

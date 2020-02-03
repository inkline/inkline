const exec = require('child_process').exec;

async function createNuxtApp(version) {
    const answers = JSON.stringify({
        "name": "nuxt",
        "description": `nuxt@${version}`,
        "author": "Alex Grozav",
        "linter": "none",
        "ui": "none",
        "pm": "npm",
        "test": "jest",
        "server": "none",
        "features": "axios",
        "mode": "universal",
        "devTools": "none"
    });

    const child = exec(`npx create-nuxt-app@${version} --answers '${answers}' nuxt/${version}`);

    child.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
        console.error(data.toString);
    });
}

['2.11', '2.10', '2.9', '2.8'].forEach((version) => {
    createNuxtApp(version);
});

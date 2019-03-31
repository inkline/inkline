const fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

const path = process.argv[2];

fs.readdir(path, function(err, items) {
    console.log(items);

    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
    }
});

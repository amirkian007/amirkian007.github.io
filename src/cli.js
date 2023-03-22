const { program } = require('commander');
const path = require('path');
const { generateIconPackage } = require('./iconPackGenerator')
const fs = require('fs');

function run() {

    program
        .version('1.1.1')
        .option('-c, --config <config>', ' config file in json format')
        .parse(process.argv);

    if (program._optionValues.config) {
        const configPath = path.resolve(process.cwd(), program._optionValues.config);
        if (fs.existsSync(configPath)) {
            fs.readFile(configPath, (err, data) => {
                if (err) throw err;
                const config = JSON.parse(data);
                generateIconPackage(config)
            });
        } else {
            console.log(`Error: ${configPath} does not exist.`);
            process.exit(0)

        }
    } else {
        console.error("please provide a config file adrress")
        process.exit(0)
    }
}

module.exports = run
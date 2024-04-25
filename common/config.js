const fs = require('fs');
let localConfigData = fs.readFileSync('./config/local.JSON');

exports.getLocalConfigData = () => {
    return JSON.parse(localConfigData);
}
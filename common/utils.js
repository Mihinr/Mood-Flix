var cryptoJS = require("crypto-js");
var configData = require("./config.js");
var dayjs = require("dayjs");

exports.getDecrptedValue = (inputVal) => {
  var inputValBytes = cryptoJS.AES.decrypt(inputVal, "$ecretKey");
  var decryptedInputVal = inputValBytes.toString(cryptoJS.enc.Utf8);
  return decryptedInputVal;
};
exports.getEncrptedValue = (inputVal) => {
  var encryptedInputVal = cryptoJS.AES.encrypt(
    inputVal,
    "$ecretKey"
  ).toString();
  return encryptedInputVal;
};
exports.getConfigByConfigName = (configName) => {
  try {
    let localConfig = configData.getLocalConfigData();
    var localConfigValue = JSON.stringify(localConfig[configName]);
    if (
      localConfigValue != null &&
      localConfigValue != undefined &&
      localConfigValue != ""
    ) {
      //Data is present in local config
      return JSON.parse(localConfigValue);
    }  else {
        return null;
      
    }
  } catch (err) {
    console.log(err);
  }
};
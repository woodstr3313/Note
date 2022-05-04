const res = require("express/lib/response");
const fs = require("fs");
const util = require("util");

// PROMISE FS.FILE
const getDataFromDB = util.promisify(fs.readFile);

const writeToDatabase = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Note added successfully");
    }
  });

const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToDatabase(file, parsedData);
    }
  });
};

module.exports = { getDataFromDB, writeToDatabase, readAndAppend };

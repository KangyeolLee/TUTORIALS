const fs = require("fs");
const path = require("path");

const filterFileList = (directory, extension, callback) => {
  fs.readdir(directory, (err, data) => {
    if (err) {
      return callback(err);
    }

    const fullExtension = "." + extension;
    const list = data.filter((file) => path.extname(file) === fullExtension);

    callback(null, list);
  });
};

module.exports = filterFileList;

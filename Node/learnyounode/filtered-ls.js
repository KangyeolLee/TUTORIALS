const fs = require("fs");
const path = require("path");

const fileDir = process.argv[2];
const extension = "." + process.argv[3];

const callback = (err, data) => {
  if (err) {
    console.log(`Error Occured: ${err}`);
  } else {
    data.forEach((file) => {
      if (path.extname(file) === extension) {
        console.log(file);
      }
    });
  }
};

fs.readdir(fileDir, callback);

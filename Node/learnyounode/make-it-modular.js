const filterFileList = require("./mymodule");

const fileDir = process.argv[2];
const extension = process.argv[3];

const callback = (err, data) => {
  if (err) {
    console.log(`Error Occured: ${err}`);
  } else {
    data.forEach((file) => console.log(file));
  }
};

filterFileList(fileDir, extension, callback);

const fs = require("fs");
const target = process.argv[2];

const callback = (err, data) => {
  if (err) {
    console.log(`Error Occured: ${err}`);
  } else {
    const count = data.split("\n").length - 1;
    console.log(count);
  }
};

fs.readFile(target, "utf-8", callback);

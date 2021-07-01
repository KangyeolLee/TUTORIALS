const http = require("http");
const url = process.argv[2];

const callback = (response) => {
  response.on("data", (data) => {
    console.log(data.toString());
  });
};

http.get(url, callback);

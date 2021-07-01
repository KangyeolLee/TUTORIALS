const http = require("http");
const url = process.argv[2];
let body = "";

const callback = (response) => {
  response.on("data", (chunk) => {
    body += chunk;
  });

  response.on("end", () => {
    console.log(body.length);
    console.log(body);
  });
};

http.get(url, callback);

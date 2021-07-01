const http = require("http");
const bl = require("bl");
const result = [];
const MAX_COUNT = process.argv.length - 2;
let count = 0;

const callback = (response, index) => {
  response.pipe(
    bl((err, data) => {
      if (err) {
        return console.log(`Error Occured: ${err}`);
      }

      result[index] = data.toString();
      count++;

      if (count === MAX_COUNT) {
        result.forEach((res) => console.log(res));
      }
    })
  );
};

const httpGET = (index) => {
  http.get(process.argv[2 + index], (response) => callback(response, index));
};

for (let i = 0; i < MAX_COUNT; i++) {
  httpGET(i);
}

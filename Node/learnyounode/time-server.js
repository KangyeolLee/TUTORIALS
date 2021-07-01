const net = require("net");
const port = +process.argv[2];

const transformDate = () => {
  const fillZeroForm = (number) => (number < 10 ? "0" + number : "" + number);

  const date = new Date();
  const year = date.getFullYear();
  const month = fillZeroForm(date.getMonth() + 1);
  const day = fillZeroForm(date.getDate());
  const hour = fillZeroForm(date.getHours());
  const minute = fillZeroForm(date.getMinutes());

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + "\n";
};

const server = net.createServer((socket) => {
  const time = transformDate();
  socket.end(time);
});

server.listen(port);

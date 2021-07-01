const http = require("http");

const port = +process.argv[2];

const transformToParsetime = (time) => {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };
};

const transformToUnixtime = (time) => {
  return {
    unixtime: time.getTime(),
  };
};

const server = http.createServer((req, res) => {
  const base = "http://" + req.headers.host + "/";
  const url = new URL(req.url, base);
  const pathname = url.pathname;
  const iso = new Date(url.searchParams.get("iso"));
  let time = null;

  if (pathname === "/api/parsetime") {
    time = transformToParsetime(iso);
  } else if (pathname === "/api/unixtime") {
    time = transformToUnixtime(iso);
  }

  if (time) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(time));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port);

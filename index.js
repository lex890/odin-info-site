import http from 'node:http';
import fs from "node:fs";
import path from "node:path";

function serveFile(res, fileName, statusCode) {
  const filePath = path.join(process.cwd(), "views", fileName);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
      return;
    }

    res.writeHead(statusCode, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    serveFile(res, "index.html", 200);
  } else if (req.url === "/about") {
    serveFile(res, "about.html", 200);
  } else if (req.url === "/contact-me") {
    serveFile(res, "contact-me.html", 200);
  } else {
    serveFile(res, "404.html", 404);
  }
});

server.listen(8080);

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const DEFAULT_FILE = 'bnb-react.html'; // the React page we created earlier

const server = http.createServer((req, res) => {
  const requestUrl = decodeURIComponent(req.url);
  const filePath = requestUrl === '/'
    ? path.join(__dirname, DEFAULT_FILE)
    : path.join(__dirname, requestUrl);

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/${DEFAULT_FILE}`);
});

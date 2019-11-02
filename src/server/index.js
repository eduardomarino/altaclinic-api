const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'X-Powered-by': 'Node.js'
  });

  res.end(
    JSON.stringify({
      success: false,
      error: 'Not Found',
      data: null
    })
  );
});
const port = 5000;

server.listen(port, () => console.log(`>>> Server running on port: ${port}`));

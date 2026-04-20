const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.length > 1) {
    const value = Number(req.url.slice(1))

    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(String(value))
      }
    })
  }

  res.end('OK')
})

const wss = new WebSocket.Server({ server })

server.listen(10000)

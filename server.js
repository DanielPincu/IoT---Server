const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/payload')) {
    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(JSON.stringify({ type: 'payload', value: +req.url.split('=').pop() }))
      }
    })
  }

  res.end('OK')
})

const wss = new WebSocket.Server({ server })

server.listen(10000)
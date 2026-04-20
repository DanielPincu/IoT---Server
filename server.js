const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  if (req.url === '/') return res.end('OK')
  res.end()
})

const wss = new WebSocket.Server({ server })

wss.on('connection', ws =>
  ws.on('message', msg =>
    wss.clients.forEach(c =>
      c.readyState === WebSocket.OPEN && c.send(msg.toString())
    )
  )
)

server.listen(10000)
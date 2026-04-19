const http = require('http')
const WebSocket = require('ws')

const port = process.env.PORT || 10000

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('OK')
})

const wss = new WebSocket.Server({ server })

console.log('WS running on port', port)

server.listen(port)

wss.on('connection', (ws) => {
  console.log('client connected')

  ws.on('message', (msg) => {
    const text = msg.toString()
    console.log('received:', text)

    // broadcast to all
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(text)
      }
    })
  })

  ws.on('close', () => {
    console.log('client disconnected')
  })
})
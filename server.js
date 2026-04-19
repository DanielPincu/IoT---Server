const http = require('http')
const WebSocket = require('ws')

const port = process.env.PORT || 10000

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/temp')) {
    const url = new URL(req.url, 'http://localhost')
    const value = url.searchParams.get('value')

    console.log('TEMP FROM DEVICE:', value)

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'temp',
          value: Number(value)
        }))
      }
    })

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('OK')
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('OK')
})

const wss = new WebSocket.Server({ noServer: true })

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req)
  })
})

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
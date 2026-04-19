const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/temp')) {
    const value = new URL(req.url, 'http://x').searchParams.get('value')

    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(JSON.stringify({ type: 'temp', value: Number(value) }))
      }
    })
  }

  res.end('OK')
})

const wss = new WebSocket.Server({ noServer: true })

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, ws => wss.emit('connection', ws))
})

server.listen(10000)
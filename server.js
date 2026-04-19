const http = require('http')
const WebSocket = require('ws')

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/temp')) {
    const value = new URL(req.url, 'http://x').searchParams.get('value')

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'temp', value: Number(value) }))
      }
    })
  }

  res.end('OK')
})

const wss = new WebSocket.Server({ server })

server.listen(10000)
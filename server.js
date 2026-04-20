const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 10000 })

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const text = msg.toString()

    wss.clients.forEach(c => {
      if (c.readyState === WebSocket.OPEN) {
        c.send(text)
      }
    })
  })
})
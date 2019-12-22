const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    console.log('io connected')

    socket.on('createMessage', data => {
      setTimeout(() => {
        socket.emit('newMessage', {
          text: data.text + ' Server'
        })
      }, 5000)
    })

    socket.emit('newMessage', {
      text: 'what'
    })

})

module.exports = {
  app, server
}

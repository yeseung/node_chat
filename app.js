const express = require('express')
const http = require('http')
const app = express()
const port = 80
const server = http.createServer(app)
const socketIO = require('socket.io')
const moment = require('moment')


const io = socketIO(server)

io.on('connection', (socket) => {
    console.log('연결이 이루어 졌습니다.')

    socket.on("chatting", (data) => {
        console.log(data)
        const { name, msg } = data
        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        })
    })
})

app.use(express.static(__dirname + '/public'))



server.listen(port, ()=>{
    console.log(`서버가 실행되었습니다. 접속주소 : http://localhost:${port}`)
})
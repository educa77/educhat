const PORT = 5000 ? 5000 : 5432

const io = require("socket.io")(PÒRT, {
  cors: {
    origin: "http://localhost:3000" || process.env.URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});



io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})
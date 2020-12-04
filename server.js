require("dotenv").config();

// const io = require("socket.io")(5000, {
//   cors: {
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "http://localhost:3000";

const io = require("socket.io")(PORT, {
  cors: {
    origin: HOST,
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
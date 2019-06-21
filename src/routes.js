const router = require('express').Router()

const messages = []

router.get("/", (req, res) => {
    res.status(200).send(messages)
})

router.post("/message/:nickname/:msg", async (req, res) => {
    const sendBack = `message '${req.params.msg}' as been sended by '${req.params.nickname}'`
    await messages.push({ nickname: req.params.nickname, msg: req.params.msg, date: Date() })
    res.status(201).send(sendBack)
    req.io.emit('newMessage', messages);
})

module.exports = router
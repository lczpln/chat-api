const router = require('express').Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const messages = []

router.get("/", (req, res) => {
    res.status(200).send(messages)
})

router.post("/message/:nickname", async (req, res) => {
    const sendBack = `message '${req.body.msg}' as been sended by '${req.params.nickname}'`
    await messages.push({ nickname: req.params.nickname, msg: req.body.msg, date: req.body.date })
    res.status(201).send(sendBack)
    req.io.emit('newMessage', messages);
})

module.exports = router
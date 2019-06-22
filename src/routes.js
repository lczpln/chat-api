const router = require('express').Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const messages = []

router.get("/", (req, res) => {
    res.status(200).send(messages)
})

router.post("/welcome/:nickname/", (req, res) => {
    const user = req.params.nickname;
    const date = req.body.date;

    messages.push({ nickname: "MASTER123456789ROBOT", msg: `${user} acabou de entrar.`, date: date })

    res.status(200).send(`${user} acabou de entrar.`)
    req.io.emit('newMessage', messages);
})

router.post("/message/:nickname", async (req, res) => {
    const sendBack = `message '${req.body.msg}' as been sended by '${req.params.nickname}'`
    await messages.push({ portrait: req.body.portrait, nickname: req.params.nickname, msg: req.body.msg, date: req.body.date })
    res.status(201).send(sendBack)
    req.io.emit('newMessage', messages);
})

module.exports = router
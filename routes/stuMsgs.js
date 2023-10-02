const router = require('express').Router();
const StuMsgs = require('../models/stuMsgModel/StuMsg')

router.get('/', async(req, res)=>{
    try {
        const messages = await StuMsgs.find();
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/', async(req, res)=>{
    const msg = new StuMsgs({
        senderId: req.body.senderId,
        text: req.body.text,
        name: req.body.name
    })
    try {
        const new_msg = await msg.save();
        res.status(200).json(new_msg)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
const router = require('express').Router();
const AdminMsg = require('../models/adminMsgModel/AdminMsg')

router.get('/', async(req, res)=>{
    try {
        const messages = await AdminMsg.find();
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/', async(req, res)=>{
    const msg = new AdminMsg({
        senderId: req.body.senderId,
        message: req.body.message
    })
    try {
        const new_msg = await msg.save();
        res.status(200).json(new_msg)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
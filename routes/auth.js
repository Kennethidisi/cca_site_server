const router = require('express').Router();
const Student = require('../models/studentModel/Student')
const bcrypt = require('bcrypt')
const Admin = require('../models/adminModel/Admin')


// register student
router.post('/register', async(req, res)=>{

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const student = new Student({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            course: req.body.course,
            session: req.body.session,
            password: hashedPassword,
            isAdmin: false,
        })

        const new_student = await student.save();
        res.status(200).json(new_student)
    } catch (error) {
        res.status(500).json({msg: error})
    }

})


// student login
router.post('/login', async(req, res)=>{
    try {
        const student = await Student.findOne({email: req.body.email})
        if(!student){
           res.status(404).json("No registered Student with this email" + req.body.email)
           return;
        }

        const validPassword = await bcrypt.compare(req.body.password, student.password)

        if(!validPassword){
            res.status(400).json("Password is incorrect")
            return;
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({msg: error})
    }
})


// register admin
router.post('/admin/register', async(req, res)=>{
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, salt)

        if(req.body.secret_key !== "admingo123"){
            return res.status(400).json("Invalid Secret Key")
        }

        const User = new Admin({
            name: req.body.name,
            phone_no: req.body.phone_no,
            email_address: req.body.email_address,
            password: hashedpassword,
            isAdmin: true,
            secret_key: req.body.secret_key
        })

        const new_user = await User.save();
        res.status(200).json(new_user)

    } catch (error) {
        res.status(500).json({msg: error})
    }
})


// admin Login
router.post('/admin/login', async(req, res)=>{
    try {
        const user = await Admin.findOne({email_address: req.body.email_address})

        if(!user){
            res.status(404).json("No registered Admin with this email" + req.body.email)
           return;
        }

        if(req.body.secret_key !== "admingo123"){
            return res.status(403).json("Invalid Secret Key")
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            res.status(400).json("Password is incorrect")
            return;
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({msg: error})
    }
})


module.exports = router

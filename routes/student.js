const router = require('express').Router();
const Student = require('../models/studentModel/Student')
const Admin = require('../models/adminModel/Admin')
const bcrypt = require('bcrypt')



// get admin
router.get('/admin', async(req, res)=>{
    try {
        const admins = await Admin.find()
        res.status(200).json(admins)
    } catch (error) {
        res.status(500).json(error)
    }
})



// get students
router.get('/', async(req, res)=>{
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get one student
router.get('/:id', async(req, res)=>{
    try {
        const student = await Student.findById(req.params.id)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
})

// delete student
router.delete('/:id', async(req, res)=>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json(error)
    }
})


// update student
router.put('/:id', async(req, res)=>{
    if(req.body.password){
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (error) {
            return res.status(500).json(error);
        }
    }

        try {
            const student = await Student.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json(student)
        } catch (error) {
            res.status(500).json(error)
        }
    
})


module.exports = router
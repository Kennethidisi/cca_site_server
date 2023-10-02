const router = require('express').Router();
const Courses = require('../models/courseModel/Course')


// post course
router.post('/', async(req, res)=>{
    const course = new Courses({
        name: req.body.name,
        price: req.body.price,
        courseImg: req.body.courseImg,
        duration: req.body.duration,
        infoText: req.body.infoText
    })

    try {
        const new_course = await course.save();
        res.status(200).json(new_course)
    } catch (error) {
        res.status(500).json(error)
    }
});


// get courses
router.get('/', async(req, res)=>{
    try {
        const courses = await Courses.find();
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json(error)
    }
});



// get one course
router.get('/:id', async(req, res)=>{
    try {
        const course = await Courses.findById(req.params.id);
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json(error)
    }
});



// delete course
router.delete('/:id', async(req, res)=>{
    try {
        const course = await Courses.findByIdAndDelete(req.params.id);
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json(error)
    }
});


// update course
router.put('/:id', async(req, res)=>{
    try {
        const course = await Courses.findByIdAndUpdate(req.params.id, {$set: req.body});
    } catch (error) {
        res.status(500).json(error)
    }
});


module.exports = router;
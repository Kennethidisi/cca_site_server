const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const path = require('path')
const multer = require('multer')

const studentRouter = require('./routes/student')
const authRouter = require('./routes/auth')
const courseRouter = require('./routes/courses')
const msgAdminRouter = require('./routes/msgAdmin')
const StuMsgsRouter = require('./routes/stuMsgs')

dotenv.config()

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/images', express.static(path.join(__dirname, "public/images")))

mongoose.connect("mongodb+srv://kennethidisi21:omamuzo09037918492@cluster0.pew5yup.mongodb.net").then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log("unable to connect due to"+err)
})


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})


const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    try {
        return res.status(200).json("file uploaded sucessfully")
    } catch (error) {
        console.log(error)
    }
})


// my middlewares
app.use('/api/cca', studentRouter);
app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/adminMsg', msgAdminRouter);
app.use('/api/stuMsg', StuMsgsRouter);

const PORT = 4000 || process.env.PORT
        app.listen(PORT, ()=>{
            console.log(`app is running on PORT ${PORT}...`)
        })

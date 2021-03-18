
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-COntrol-Allow-origin","*")
    res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE")
    res.header("Access-Control-Allow-Headers","Origin","X-Requested-With","Content-Type","Accept")
    next()
})

const db = config.get('mongoURI');
const college = require('./models/college');
const student = require('./models/student');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//add a new college
app.post('/college', (req, res) => {
    const newCollege = new college({
      'ID': req.body.ID,
      'Name':req.body.Name,
      'YearFounded':req.body.YearFounded,
      'City':req.body.City,
      'State':req.body.State,
      'Country':req.body.Country,
      'NoOfStudents':req.body.NoOfStudents,
      'Courses':req.body.Courses
    });
    newCollege
      .save()
      .then(newCollege => res.send(newCollege));
  });

//read all colleges
app.get('/college',(req,res)=>{
    college.find({})
        .then(college=>res.send(college))
        .catch((error)=>console.log(error));
});

//find a specific college from collegeID
app.get('/college/:ID',(req,res)=>{
    college.findOne({_id:req.params.ID})
        .then(college=>res.send(college))
        .catch((error)=>console.log(error));
});

//find the entire student database from collegeID
app.get('college/:ID/student',(req,res)=>{
    student.find({_CollegeID:req.params.ID})
        .then((student)=>res.setDefaultEncoding(student))
        .catch((error)=>console.log(error));
});

//find student information from collegeID and studentID
app.get('/college/:ID/student/:SID',(req,res)=>{
    student.findOne({CollegeID:req.params,ID:req.params.SID})
        .then((oneStudent)=>res.send(oneStudent))
        .catch((error)=>console.log(error));
});

//update college information
app.patch('/college/:ID',(req,res)=>{
    college.findOneAndUpdate({ID:req.params.ID},{$set:req.body})
        .then((college)=>res.send(college))
        .catch((error)=>console.log(error));
});

//update student information
app.patch('/college/:ID/student/:SID',(req,res)=>{
    student.findOneAndUpdate({ID:req.params.ID,ID:req.params.SID},{$set:req.body})
    .then((student)=>res.send(student))
    .catch((error)=>console.log(error));
});

//delete college information
app.delete('/college/:ID',(req,res)=>{
    const deleteStudents = (college)=>{
        student.deleteMany({ID:req.params.ID})
            .then(()=>college)
            .catch(()=>console.log(error))
    };
    college.findByIdAndDelete({ID:req.params.ID})
        .then((college)=>res.send(deleteStudents(college)))
        .catch((error)=>console.log(error));
});

//delete student information
app.delete('/college/:ID/student/:SID',(req,res)=>{
    student.findOneAndDelete({ID:req.params.SID,CollegeID:req.params.ID})
        .then((student)=>res.send(student))
        .catch((error)=>console.log(error));
});


 



const port = 5000;
app.listen(port, () => console.log(`Server started on port: http://localhost:${port}`));
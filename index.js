import express from 'express';
import mentorRouter from './routes/mentor.js';
import studentRouter from './routes/students.js';
import connectionToDb from './db/mangoose_connection.js';


var app=express();

await connectionToDb();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/mentor',mentorRouter)
app.use('/student',studentRouter)
 

app.listen(5050,()=>{console.log("successfully port is running")});



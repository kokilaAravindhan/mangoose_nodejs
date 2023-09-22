import express from "express";
import { studentSchema } from "../db/models.js";


const studentRouter=express.Router();

studentRouter.get('/',async(req,res)=> {
    try {
        const data = await studentSchema.find({},{id:1,name:1,mentor:1});
        res.send(data);
      } catch (e) {
        console.log(e, "error");
        res.status(400).send(e);
      }
    
});

studentRouter.post('/',async (req,res)=> {
    console.log("student create route");
    try {
      const data = await studentSchema({...req.body});
     
      res.send(data);
    } catch (e) {
      console.log(e, "error");
      res.status(400).send("Error");
    }
    
}); 

studentRouter.get("/:id", async (req, res) => {
    console.log("show all students for particular mentor");
    try {
      const ment = await studentSchema
        .findById(req.params.id)
        .populate("student", "name");
      res.send(ment);
    } catch (e) {
      console.log(e, "error");
      res.status(500).send("error in for 1 mentor get all students");
    }
  });
/*  List of students with no mentors */

studentRouter.get('/no-mentors',async (req,res) => {
    const students = await studentSchema.find({mentor:undefined})
    res.send(students);
})
/* Assign or change Mentor for Student -- select one student and assign one mentor */

studentRouter.patch('/assign-mentor/:id',async (req,res) => {
    const {id} = req.params;
    const {mentor} = req.body;
    try{
        const student = await studentSchema.findById(id);
        student.mentor = mentor;
        await student.save();
        res.send(student);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
/* select one mentor and add to multiple students */

studentRouter.patch('/assign-mentor-students', async (req,res) => {
    const {mentor,stud_list} = req.body;
    console.log(stud_list)
    try{
        stud_list.map( async (stud_id) => {
            const student = await studentSchema.findById(stud_id)
            student.mentor = mentor;
            await student.save();
        })
        res.send("Updated Successfully");  
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

/* show all students for a particular mentor */

studentRouter.get('/mentor-students/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const students = await studentSchema.find({mentor : id});
        res.send(students);
    }catch(err){
        res.send(err);
    }
})


export default studentRouter;


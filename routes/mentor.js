import express from "express";
import { mentorSchema  } from "../db/models.js";

/*var mentors=[
    {id:1,name:'sanjay',students:['kavya'],email:'koko@gmail.com'},
    {id:2,name:'harini',students:['sowmya'],email:'roro@gmail.com'},
    {id:3,name:'saranya',students:['balaji'],email:'balu@gmail.com'}
];*/

const mentorRouter=express.Router();

mentorRouter.get('/',async(req,res)=> {
    try {
        const data = await mentorSchema.find({id:1,name:1,student:1,email:1});
        res.send(data);
        
      } catch (e) {
        console.log(e, "error");
        res.status(400).send(e);
      }
    
});

mentorRouter.post('/',async (req,res)=> {
    console.log("mentor create route");
    try {
      const data = await mentorSchema(req.body);
       await data.save();
      res.send({msg:'the values send'})
      
    } catch (e) {
      console.log(e, "error");
      
      res.send({msg:'the values not send'})
    }
    
}); 

mentorRouter.get("/:id", async (req, res) => {
    console.log("show all students for particular mentor");
    try {
      const ment = await mentorSchema
        .findById(req.params.id)
        .populate("studentsAssigned", "name");
      res.send(ment);
    } catch (e) {
      console.log(e, "error");
      res.status(500).send("error in for 1 mentor get all students");
    }
  });

/*mentorRouter.get('/',(req,res)=> {
    res.send(mentors);
    console.log(res.body);
});

mentorRouter.post('/',(req,res)=> { 
    console.log(req.body); 
    mentors.push(req.body);
    res.send(mentors);
});

mentorRouter.put('/:mentorId',(req,res)=> { 
    const {mentorId}=req.params
    const newMentor=req.body;
    const oldMentor=mentors.find(mentor=>mentor.id==mentorId);
    mentors=mentors.filter(mentors=>mentors.id!==oldMentor.id);
    mentors.push(newMentor)    
    res.send(mentors);
});

mentorRouter.delete('/:mentorId',(req,res)=> { 
    const {mentorId}=req.params
   
   
    mentors=mentors.filter(mentors=>mentors.id!==oldMentor.id);
   
    res.send(mentors);
});*/

export default mentorRouter;


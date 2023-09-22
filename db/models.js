import mongoose from "mongoose";

const model=new mongoose.Schema({
    id:{
        type:'string',
        required:true
    },
    name:{
        type:'string',
        required:true
    },
    student:{
        type:'string',
        required:true
    },
    email:{
        type:'string',
        required:true
    }
});
const mentorSchema=mongoose.model('mentor',model)

const studmodel=new mongoose.Schema({
    id:{
        type:'string',
        required:true
    },
    name:{
        type:'string',
        required:true
    },
    mentor:{
        type:'string',
        required:true
    }
});
const studentSchema=mongoose.model('student',studmodel)

export{
    mentorSchema,studentSchema
}
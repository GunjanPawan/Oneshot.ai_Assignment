
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    SID:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Name:{
        type:String
    },
    YearOfBatch:{
        type:Number
    },
    CollegeID:{
        type:Number,
        required:true
    },
    Skills:{
        type:String
    }
});

module.exports = Item = mongoose.model('student',studentSchema);
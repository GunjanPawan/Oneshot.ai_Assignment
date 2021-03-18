
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    ID:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    Name:{
        type:String
    },
    YearFounded:{
        type:Number
    },
    City:{
        type:String
    },
    State:{
        type:String
    },
    Country:{
        type:String
    },
    NoOfStudents:{
        type:Number,
        default:100
    },
    Courses:{
        type:String
    }
});

module.exports = Item = mongoose.model('college',collegeSchema);
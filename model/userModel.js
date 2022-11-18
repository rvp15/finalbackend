const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required:[true,'Please add a name'],
        unique: true
    },
    phnumber:{
        type: String,
        required:[true,'Please add your phone number'],
        unique: true
    },
    unitnum:{
        type: String,
        required:[true,'Please add your phone number'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'Please add email'],
        unique: true
    } ,
    password: {
        type: String, 
        required:[true,'Please add password'],
        minlength: 6
    },
    isadmin:{
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('User', userSchema)

//in mongobd  it will be stored as users (small case and also add plural)
const mongoose = require ('mongoose')

const ticketSchema = mongoose.Schema({
    name:{
      type: String,
    },
    unitnum:{
        type: String,
    },
 
    category:{
        type: String,
        required: true,
    },
    detail:[{
        description:String,
        date:{type:Date,default:Date.now},
    }],
    status:{
        type: String,
        default:'Open'
    },
   
    //this allows the user associate with his tickets
   user:{
        type: String,
        require: true,
        ref: 'User',
    },
    username:{
        type: String,
        require: true,
        ref: 'User',
    },
    phnumber:{ type: String,
        require: true,
        ref: 'User',}
   
} ,
{
        timestamps: true
    })

    module.exports = mongoose.model('Ticket',ticketSchema)
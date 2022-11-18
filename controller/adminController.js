const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");


const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
        //1. Check if the user exists
        const admin = await User.findOne({email});
        if (!admin) {
        res.status(404)
            throw new Error("Admin not avaliable!");
        }
    if(admin.isadmin && (await bcrypt.compare(password, admin.password))){
            res.json({
                _id:admin.id,
                name:admin.name,
                email:admin.email,
                isadmin:admin.isadmin,
                token: generateToken(admin._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid admin Credentials')
        }
});

//GET: Route:/admin/getalltickets
const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({});
    const usersIds = Array.from(new Set(tickets.map(x=>x.user)));
    const usersData = await User.find( {_id: { $in: [...usersIds] } });
    // console.log('usersIds', usersIds, usersData)
    // const concatData = {...tickets,...usersData}
    // console.log('concat',concatData)
    // console.log(tickets,usersData)
    res.status(200).json({tickets,usersData});
  });
  
  //GET: Route:/admin/getalltickets
const getAllUser = asyncHandler(async (req, res) => {
    const allusers = await User.find({});
    res.status(200).json(allusers);
  });

    //DELETE: Route:/admin/delete/:id
const deleteUser = asyncHandler(async(req,res)=>{
    const findUser =  await User.findById(req.params.id)
    // findUser.remove()
    console.log(findUser._id)
  
   const delUserRes = await User.findByIdAndDelete(req.params.id)
 const delTicketsRes = await Ticket.deleteMany({user:findUser._id})
    res.status(200).json({status: "success"});

})
  //DELETE: Route:/admin/edit/:id
const editTicket = asyncHandler(async(req,res)=>{
    console.log('adminedit',req.body)
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        { status:req.body.update} ,
        { new: true }
      );

      console.log(updatedTicket)
      res.status(200).json(updatedTicket);
} )


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}



module.exports ={loginAdmin,getAllTickets,getAllUser,deleteUser,editTicket}
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

//////////////////////////////////////////////////////////////
//POST: /api/user/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //1.Check if user already exist
const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Alredy exist");
  }
  //2.if user doesnt exist encrypt pwd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  //3.Add the new user to the database with encryptedpwd:
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
if(newUser){
    res.status(201).json({
        _id:newUser.id,
        name:newUser.name,
        email:newUser.email,
        phnumber:newUser.phnumber,
        token: generateToken(newUser._id)
    })
}else{
res.status(400)
throw new Error('Invalid user data')
}
 
});

//////////////////////////////////////////////////////////////
//POST: /api/user/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
        //1. Check if the user exists
        const existingUser = await User.findOne({email});
        if (!existingUser) {
        res.status(404)
            throw new Error("No such user Exits. Signup Please!");
        }
    if(existingUser && (await bcrypt.compare(password, existingUser.password))){
            res.json({
                _id:existingUser.id,
                name:existingUser.name,
                email:existingUser.email,
                phnumber:existingUser.phnumber,
                token: generateToken(existingUser._id)
            })
        }else{
            res.status(400)
            throw new Error('Invalid Credentials')
        }
});

//////////////////////////////////////////////////////////////
// Private Route
// GET: /api/user/userinfo
const getuserInfo = asyncHandler(async (req, res) => {
//  const {name,email,_id} = await User.findById(req.user.id)
 res.status(200).json(req.user)
});

//////////////////////////////////////////////////////////////
//Generate JWT:
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}


//////////////////////////////////////////////////////////////
module.exports = { registerUser, loginUser, getuserInfo };

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      //Get token from header:by spliting by space and get index 1 value (token)
      token = req.headers.authorization.split(" ")[1];
      //verify found token:
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(verify)//has id,iat,exp
      //if verification is sucessful, get the user with the help of id 
      // and add it to request object 
      req.user = await User.findById(verify.id).select("-password");
      // console.log(req.user.id)
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No Authorized Token ");
  }
});

module.exports = { protect };

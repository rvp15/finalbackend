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
        token = req.headers.authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);
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
  
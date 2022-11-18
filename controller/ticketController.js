const asyncHandler = require("express-async-handler");
const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");
//GET: Route:/user/ticket
const allTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//POST, Route:/user/ticket
const createTicket = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new Error("Please Enter the values");
  }
  // {$push:{detail:{'description':req.body.update,'date':new Date()}}},
  const ticket = await Ticket.create({
    name:req.body.name,
    unitnum:req.body.unitnum, 
    category: req.body.category,
    detail: [{ description: req.body.detail, date: new Date() }],
    user: req.user.id,
  }); 
  res.status(200).json(ticket);
});

//PUT, Route/user/ticket/:id
const updateTicket = asyncHandler(async (req, res) => {
  const findTicket = await Ticket.findById(req.params.id);
  if (!findTicket) {
    res.status(400);
    throw new Error("Ticket not found");
  }

  // const user = await User.findById(req.user.id)
  //check for user:
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //check if the user id in ticket (user id:we attached in middleware)matches with the logged in user
  if (findTicket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  // const dataToUpdate = {...findTicket, detail:[{'description':req.body.update,'date':new Date()}]}
  // console.log('dataToUpdate', dataToUpdate)
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { $push: { detail: { description: req.body.update, date: new Date() } } },
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// DELETE, Route:/user/ticket/:id
const deleteTicket = asyncHandler(async (req, res) => {
  const findTicket = await Ticket.findById(req.params.id);
  if (!findTicket) {
    res.status(400);
    throw new Error("Ticket not found");
  }
  // const user = await User.findById(req.user.id)
  //check for user:
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //check if the user id in ticket (user id:we attached in middleware)matches with the logged in user
  if (findTicket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  await findTicket.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = { allTickets, createTicket, updateTicket, deleteTicket };

const express = require("express");
const router = express.Router();
const {
  allTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketController");
const { protect } = require("../middleware/authMiddleware");


router.get("/",protect,allTickets);

router.post("/",protect,createTicket);

router.put("/:id",protect,updateTicket);

router.delete("/:id",protect,deleteTicket);

module.exports = router;

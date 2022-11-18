const express = require('express')
const {editTicket, loginAdmin, getAllTickets, getAllUser ,deleteUser} = require('../controller/adminController')
const router = express.Router()
const { protect } = require('../middleware/adminMiddleware')

router.post('/adminlogin',loginAdmin )
router.get('/getalluser',protect,getAllUser )
router.delete('/delete/:id',protect,deleteUser)
router.put('/edit/:id',protect,editTicket)
router.get('/getallticket',protect,getAllTickets )

module.exports = router
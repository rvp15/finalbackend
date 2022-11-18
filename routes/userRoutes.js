const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getuserInfo } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/register',registerUser )
router.post('/login',loginUser )
router.get('/userinfo',protect,getuserInfo )


module.exports = router
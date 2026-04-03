var express = require('express');
const { getProfile, addProfile, updateProfile, deleteProfile } = require('../Controller/ProfileController');
const authMiddleware = require('../Middleware/authMiddleware');
var router = express.Router();

router.get("/profile/:id", getProfile)
router.post("/addprofile", authMiddleware, addProfile)
router.put("/updateprofile/:id", authMiddleware, updateProfile)
router.delete("/deleteprofile/:id", authMiddleware, deleteProfile)

module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/", authController.checkUser, async (req, res) => {
  try {
    console.log(req);
    res.status(201).json({ dietaryProfile: req.user.dietaryProfile });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

module.exports = router;

// 9:30

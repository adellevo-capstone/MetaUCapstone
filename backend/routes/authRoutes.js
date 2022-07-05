const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

// ---- Authentication ----

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

// ---- User information ----

router.get("/dietaryProfile", authController.checkUser, async (req, res) => {
  try {
    // console.log(req);
    res.status(201).json({ dietaryProfile: req.user.dietaryProfile });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

// ---- Securing routes ----

router.use(authController.secure);
// router.use(authController.clearanceLevel("level 1"));
// router.route("/secretcontent").get(authController.secretContent);

module.exports = router;

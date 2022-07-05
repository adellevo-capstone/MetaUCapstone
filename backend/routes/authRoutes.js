const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ---- Authentication ----

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

// ---- User information ----

router.get("/dietaryProfile", authController.checkUser, async (req, res) => {
  try {
    res.status(201).json({ dietaryProfile: req.user.dietaryProfile });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.post("/dietaryProfile/add", authController.checkUser, async (req, res) => {
  try {
    const newItem = req.body.food;
    const sectionType = req.body.sectionType.toLowerCase();
    const arrayToUpdate = req.user.dietaryProfile[sectionType];
    // console.log("arrayToUpdate: ", arrayToUpdate);
    // const arrayToUpdate = req.user.dietaryProfile.likes;

    arrayToUpdate.push(newItem);
    req.user.save();

    // res.status(201).json({ arrayToUpdate });
    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.patch("/dietaryProfile/delete", authController.checkUser, async (req, res) => {
  try {
    const itemToDelete = req.body.food;
    const sectionType = req.body.sectionType.toLowerCase();
    const arrayToUpdate = req.user.dietaryProfile[sectionType];

    arrayToUpdate.pull(itemToDelete);
    req.user.save();

    res.status(201).json({ arrayToUpdate });
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

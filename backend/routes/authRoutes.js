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

router.patch("/dietaryProfile/modify", authController.checkUser, async (req, res) => {
  try {
    const sectionType = req.body.sectionType.toLowerCase();
    req.user.dietaryProfile[sectionType] = req.body.updatedArray;

    req.user.save();

    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.patch("/dietaryProfile/addRestaurant", authController.checkUser, async (req, res) => {
  try {
    const newRestaurant = req.body.restaurantToAdd;

    req.user.dietaryProfile.favoriteRestaurants.push(newRestaurant);
    req.user.save();

    res.status(201).json({ user: req.user });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
});

router.use(authController.secure);
// router.use(authController.clearanceLevel("level 1"));
// router.route("/secretcontent").get(authController.secretContent);

module.exports = router;

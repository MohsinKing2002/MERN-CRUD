const express = require('express');
const {isAuthenticated, authorizeRole} = require('../middleware/authenticate');
const { registerUser, loginUser, updateProfile, deleteProfile, myProfile, logoutUser, deleteUser, contactUs, getAllUsers } = require('../controllers/userController');
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(isAuthenticated, myProfile);

router.route("/logout").get(isAuthenticated, logoutUser);

router.route("/update").put(isAuthenticated, updateProfile);

router.route("/contact").post(isAuthenticated, contactUs);

router.route("/delete").delete(isAuthenticated, deleteProfile);

//get all users
router.route("/users").get(isAuthenticated, getAllUsers);

//delete a user (admin)
router.route("/admin/action/:id").delete(isAuthenticated, authorizeRole("admin"), deleteUser);

module.exports = router;
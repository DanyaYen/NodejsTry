const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.create);
router.get("/:id", bookingController.getById);
router.get("/user/:userId", bookingController.getUserBookings);
router.patch("/:id/status", bookingController.updateStatus);

module.exports = router;

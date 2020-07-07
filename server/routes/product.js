const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const auth = require("../middleware/auth");

router.post("/image", (req, res) => {});

module.exports = router;

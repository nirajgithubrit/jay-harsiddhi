const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let model = req.body;

    if (model.name && model.email && model.password) {
      const result = await registerUser(model);
      res.send(result);
    } else {
      res.status(400).json({
        error: "Please Provide name, email and password",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message, // 🔥 send proper message
    });
  }
});

router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    const result = await loginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        error: "Email or password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      error: "Please Provide email and password",
    });
  }
});

router.post("/refresh-token", async (req, res) => {
  const token = req.body;

  if (!token) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const result = await refreshToken(token);
    res.json({ accessToken: result });
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
});

module.exports = router;

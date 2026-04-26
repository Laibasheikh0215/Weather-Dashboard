const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get current user's alert preference
router.get('/alerts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ emailAlertsEnabled: user.emailAlertsEnabled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update email alert preference
router.put('/alerts', auth, async (req, res) => {
  try {
    const { enabled } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { emailAlertsEnabled: enabled },
      { new: true }
    );
    res.json({ success: true, emailAlertsEnabled: user.emailAlertsEnabled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
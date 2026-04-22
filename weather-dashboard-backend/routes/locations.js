const express = require('express');
const { getLocations, addLocation, deleteLocation } = require('../controllers/locationController');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);
router.get('/', getLocations);
router.post('/', addLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
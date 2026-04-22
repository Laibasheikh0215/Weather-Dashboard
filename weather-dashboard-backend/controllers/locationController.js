const SavedLocation = require('../models/SavedLocation');

exports.getLocations = async (req, res) => {
  const locations = await SavedLocation.find({ userId: req.userId });
  res.json(locations);
};

exports.addLocation = async (req, res) => {
  const { cityName, lat, lon, customName } = req.body;
  const location = new SavedLocation({ userId: req.userId, cityName, lat, lon, customName });
  await location.save();
  res.status(201).json(location);
};

exports.deleteLocation = async (req, res) => {
  await SavedLocation.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: 'Deleted' });
};
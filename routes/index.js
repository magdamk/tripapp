const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment_controller');
const photoController = require('../controllers/photo_controller');
const placeController = require('../controllers/place_controller');
const weatherController = require('../controllers/weather_controller');

module.exports = router;
const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place_controller');
const photoController = require('../controllers/photo_controller');
const commentController = require('../controllers/comment_controller');
const weatherController = require('../controllers/weather_controller');

//place routes
router.get('/api/places/', placeController.getAllPlaces);
router.get('/api/places/:id', placeController.getPlaceById, placeController.getPlaceDetailsById);
router.post('/api/places/', placeController.createPlace);
router.patch('/api/places/:id', placeController.getPlaceById, placeController.updatePlace);

//photo routes
router.get('/api/photos/:id', placeController.getPlaceById, photoController.getPhotosForPlace); //place id
router.post('/api/photos/:id', placeController.getPlaceById, photoController.addPhotoForPlace); //place id
router.delete('/api/photos/:id', photoController.removePhotoById); //photo id

//comment routes
router.get('/api/comments/:id', placeController.getPlaceById, commentController.getCommentsForPlace); //place id
router.post('/api/comments/:id', placeController.getPlaceById, commentController.createCommentForPlace); //place id
router.delete('/api/comments/:id', commentController.markCommentNotProper); //comment id

//weather routes

module.exports = router;
const express = require('express');
const router = express.Router();

const placeController = require('../controllers/place_controller');
const photoController = require('../controllers/photo_controller');
const commentController = require('../controllers/comment_controller');
const weatherController = require('../controllers/weather_controller');

//place routes
router.get('/places/', placeController.getAllPlaces);
router.get('/places/:id', placeController.getPlaceDetailsById);
router.post('/places/', placeController.createPlace);
router.patch('/places/:id', placeController.updatePlace);

//photo routes
router.get('/photos/:id', photoController.getPhotosForPlace); //place id
router.post('/photos/:id', photoController.addPhotoForPlace); //place id
router.delete('/photos/:id', photoController.removePhotoById); //photo id

//comment routes
router.get('/commnets/:id', commentController.getCommentsForPlace); //place id
router.post('/comments/:id', commentController.createCommentForPlace); //place id
router.delete('/comments/:id', commentController.markCommentNotProper); //comment id

//weather routes

module.exports = router;
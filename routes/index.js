const express = require('express');
const router = express.Router();
const passport = require('passport');

const placeController = require('../controllers/place_controller');
const photoController = require('../controllers/photo_controller');
const commentController = require('../controllers/comment_controller');
const adminController = require('../controllers/admin_controller');

//login routes
router.get('/register/', adminController.getRegister);
router.post('/register/', adminController.postRegister);
router.get('/api/admin/', cors(), adminController.checkAuthenticated, adminController.getAutLogin);
router.get('/api/admin/', cors(), adminController.checkNotAuthenticated, adminController.getNotAutLogin);
router.get('/api/logout/', cors(), adminController.getLogout);
router.post('/api/admin/', cors(), passport.authenticate('local', { failureFlash: true, failureMessage: "Nieprawidłowe dane logowania" }), adminController.postLogin);

//place routes
router.get('/api/places/', cors(), placeController.getAllPlaces);
router.get('/api/places/:id', cors(), placeController.getPlaceById, placeController.getPlaceDetailsById);
router.post('/api/places/', cors(), adminController.checkAuthenticated, placeController.createPlace);
router.patch('/api/places/:id', cors(), adminController.checkAuthenticated, placeController.getPlaceById, placeController.updatePlace);

//photo routes
router.get('/api/photos/:id', cors(), placeController.getPlaceById, photoController.getPhotosForPlace); //place id
router.post('/api/photos/:id', cors(), adminController.checkAuthenticated, placeController.getPlaceById, photoController.addPhotoForPlace); //place id
router.delete('/api/photos/:id', cors(), adminController.checkAuthenticated, photoController.removePhotoById); //photo id

//comment routes
router.get('/api/comments/:id', cors(), placeController.getPlaceById, commentController.getCommentsForPlace); //place id
router.post('/api/comments/:id', cors(), placeController.getPlaceById, commentController.createCommentForPlace); //place id
router.delete('/api/comments/:id', cors(), adminController.checkAuthenticated, commentController.markCommentNotProper); //comment id

module.exports = router;
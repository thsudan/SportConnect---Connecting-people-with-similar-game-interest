const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.renderIndex);
router.get('/signup', userController.renderSignup);
router.post('/signup', userController.signup);

router.get('/signup-success', userController.renderSignupSuccess);

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);

router.get('/dashboard', userController.renderDashboard);

router.get('/logout', userController.logout);

router.get('/search-by-sport', userController.renderSportsList);

// Added routes for player listing and details
router.get('/sports-list/:sport', userController.renderSportsListBySport);
router.get('/player-details/:id', userController.renderPlayerDetails);

module.exports = router;

const express = require('express');
const router = express.Router();
const restaurantController = require("../controllers/restaurants");
const reviewController = require("../controllers/reviews");
const { loggedIn } = require('../middleware');

// Restaurants
router.get('/', restaurantController.index);
router.get('/:slug', restaurantController.show);
router.get('/:slug/reviews', reviewController.index);

// Restaurants reviews
router.get('/:slug/rate', loggedIn, reviewController.form);
router.post('/:slug/rate', loggedIn, reviewController.save);
router.get('/:slug/reviews/:id/edit', loggedIn, reviewController.show);
router.post('/:slug/reviews/:id/edit', loggedIn, reviewController.edit);

module.exports = router;
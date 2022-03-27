const express = require('express');
const router = express.Router();
const restaurantController = require("../controllers/restaurants");
const reviewController = require("../controllers/reviews");

// Restaurants
router.get('/', restaurantController.index);
router.get('/:slug', restaurantController.show);
router.get('/:slug/reviews', reviewController.index);

// Restaurants reviews
router.get('/:slug/rate', reviewController.form);
router.post('/:slug/rate', reviewController.save);
router.get('/:slug/reviews/:id/edit', reviewController.show);
router.post('/:slug/reviews/:id/edit', reviewController.edit);

module.exports = router;
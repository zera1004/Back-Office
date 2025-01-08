const express = require('express');
const controller = require('./getRestaurants.controller');

const router = express.Router();

router.get('/ranking', (req, res) =>
  controller.getTopRankingRestaurants(req, res),
);
router.get('/', (req, res) => controller.getAllRestaurants(req, res));
router.get('/search', (req, res) => controller.searchRestaurants(req, res));
router.get('/:id', (req, res) => controller.getRestaurantById(req, res));
router.get('/', (req, res) => controller.getRestaurantsByType(req, res));

module.exports = router;

const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/users/cliente', UserController.createClient);
router.post('/users/restaurante', UserController.createRestaurant);

router.get('/users', UserController.getUser);

router.get('/restaurantes', UserController.getRestaurants);
router.get('/restaurantes/tipo/:tipoCulinaria', UserController.getRestaurantsByCuisine);

router.get('/users/:id', UserController.getUserById);

router.put('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

module.exports = router;

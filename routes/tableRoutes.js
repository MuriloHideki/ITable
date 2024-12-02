const express = require('express');
const tableController = require('../controllers/tableController');
const router = express.Router();

router.post('/tables', tableController.createTable);

router.get('/tables', tableController.getAllTables);

router.get('/tables/:id', tableController.getTableById);

router.get('/tables/restaurant/:restaurantId', tableController.getTablesByRestaurant);

router.put('/tables/:id', tableController.updateTable);

router.delete('/tables/:id', tableController.deleteTable);

module.exports = router;

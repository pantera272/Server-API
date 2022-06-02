const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controllers');

router.get('/seats', SeatController.getAll);
router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.addData);

router.put('/seats/:id', SeatController.updateData);

router.delete('/seats/:id', SeatController.deleteData);

module.exports = router;
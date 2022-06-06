const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controllers');

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/:id', ConcertController.getById);
router.get('/concerts/performer/:performer', ConcertController.getPerformer);
router.get('/concerts/genre/:genre', ConcertController.getGenre);
router.get('/concerts/price/:min/:max', ConcertController.getPrice);
router.get('/concerts/day/:day', ConcertController.getDay);

router.post('/concerts', ConcertController.addData);

router.put('/concerts/:id', ConcertController.updateData);

router.delete('/concerts/:id', ConcertController.deleteData);

module.exports = router;
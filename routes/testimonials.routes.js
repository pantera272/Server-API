const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getById);
router.get('/testimonials/random', TestimonialController.getById);

router.post('/testimonials', TestimonialController.addData);

router.put('/testimonials/:id', TestimonialController.updateData);

router.delete('/testimonials/:id', TestimonialController.deleteData);

module.exports = router;
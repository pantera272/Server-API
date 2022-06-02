const Testimonials = require('../models/testimonial.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Testimonials.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getById = async (req, res) => {

  try {
    const dep = await Testimonials.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.addData = async (req, res) => {

  try {

    const { author, text } = req.body;
    const newTestimonials = new Testimonials({ author: author, text:text });
    await newTestimonials.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.updateData = async (req, res) => {
  const { author, text } = req.body;

  try {
    const dep = await Testimonials.findById(req.params.id);
    if(dep) {
      await Testimonials.updateOne({ _id: req.params.id }, { 
        $set: { 
          author: author,
          text: text,
        }
      });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.deleteData = async (req, res) => {

  try {
    const dep = await Testimonials.findById(req.params.id);
    if(dep) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.getRandom = async (req, res) => {

  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonials.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

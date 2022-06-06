const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {

  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getById = async (req, res) => {

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getPerformer = async (req, res) => {

  try {
    const dep = await Concert.find({performer: req.params.performer});
    if(dep.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(dep)
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getGenre = async (req, res) => {

  try {
    const dep = await Concert.find({genre: req.params.genre});
    if(dep.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(dep)
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getPrice = async (req, res) => {

  try {
    const { min, max } = req.params;
    const dep = await Concert.find({price: {'$gte': min, '$lte': max}});
    if(dep.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(dep)
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.getDay = async (req, res) => {

  try {
    const dep = await Concert.find({day: req.params.day});
    if(dep.length == 0) res.status(404).json({ message: 'Not found' });
    else res.json(dep)
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}

exports.addData = async (req, res) => {

  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
}

exports.updateData = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.updateOne({ _id: req.params.id }, { 
        $set: { 
          performer: performer,
          genre: genre,
          price: price,
          day: day,
          image: image 
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
    const dep = await Concert.findById(req.params.id);
    if(dep) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

}


const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    series: { type: String },
    character: { type: String },
    type: { type: String },
    condition: { type: String },
    tags: { type: String },
    photo: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema); // 'Item' is the collection name
  
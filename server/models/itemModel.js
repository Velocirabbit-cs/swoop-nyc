const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  title: { type: String, cast: false, required: true },
  image: { type: String, cast: false, required: false }, //url from supabase
  description: { type: String, cast: false, required: true },
  borough: { type: String, cast: false, required: true },
  neighborhood: { type: String, cast: false, required: true }, // [borough, neighborhood]
  dropDate: { type: Date, cast: true, default: Date.now },
  expireAt: { type: Date, cast: false, expires: '1d' }, // I think this is wrong, full document should expire
});

module.exports = mongoose.model('Item', itemSchema);

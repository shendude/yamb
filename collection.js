var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/db');
//given a 2nd order markov chain with words a, b, c
//where a and b are precursor words, and c is the predicted word
//wordSchema is the subdocument

var wordSchema = new Schema({
  word: String,
  freq: Number,
});

var freqSchema = new Schema({
  a: String,
  b: String,
  c: [wordSchema],
  total: Number
});


var Freq = mongoose.model('Freq', freqSchema);
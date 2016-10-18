var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/markov');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log('database connected')});

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

var freqDB = mongoose.model('freqDB', freqSchema);

modules.exports = freqDB;
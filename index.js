var freqDB = require('/db');

//custom inputfilter for sherlock holmes lines of text
//actual lines of story text is indented with 5 spaces only
var myFilter = function(string) {
  return (string.length > 5 && string[5] !== ' ');
}

//helper function to convert markov obj to database
var objToDB = function(obj) {
  
}

//parses an array of raw text to an object
//then to an mongodb-compatable array
function parseSentences(lines) {
  var words = [];
  //obj representation of markov graph
  var freqs = {};
  var totals = {};
  var results = []
  var increment = function(a, b, c) {
    if (!totals[a + b]) {totals[a + b] = 0}
    if (!freqs[a]) {freqs[a] = {}};
    if (!freqs[a][b]) {freqs[a][b] = {}};
    if (!freqs[a][b][c]) {freqs[a][b][c] = 0}
    totals[a+b]++;
    freqs[a][b][c]++;
  }
  for (var sentence of lines) {
    words = sentence.split(' ');
    for (var i = 0; i < words.length - 1; i++) {
      if (i === 0) {
        increment('_null', words[i], words[i+1]);
      } else {
        increment(words[i-1], words[i], words[i+1]);
      }
    }
  }
  //FIXME
}

//reads file and call above functions to convert file
//to markov chain database
function readSingleFile(evt) {
  var f = evt.target.files[0]; 

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      var rows = contents.split(/\r?\n/g);
      var sentences = [];
      var trailing = '';
      var add = function(string) {
        if (string.length + trailing.length > 40) {
          if (trailing.length) {
            sentences.push(trailing + string);
            trailing = '';
          } else {
            sentences.push(string);
          }
        }
      };
      for (var line of rows) {
        line = line.split('"').join('');
        if (myFilter(line)) {
          var temp = line.slice(5).split('. ');
          for (var i = 0; i < temp.length; i++) {
            if (i < temp.length - 1) {
              add(temp[i] + '.');
            } else {
              if (temp[i].slice(-1) === '.') {
                add(temp[i]);
              } else {
                trailing += temp[i] + ' ';
              }
            }
          }
        }
      }
      //turns sentences into a markov graph array
      parseSentences(sentences);
    }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
}

//event listener for file input
document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
function parseSentences(lines) {
  var words = [];
  //json obj representatoin of markov graph
  var freqs = {'_totals':{}};
  var results = []
  var increment = function(a, b, c) {
    if (!freqs._totals[a + b]) {freqs._totals[a + b] = 0}
    if (!freqs[a]) {freqs[a] = {}};
    if (!freqs[a][b]) {freqs[a][b] = {}};
    if (!freqs[a][b][c]) {freqs[a][b][c] = 0}
    freqs._totals[a+b]++;
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

//function saveText(text, filename){
//  var a = document.getElementById('out');
//  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
//  a.setAttribute('download', filename);
//  a.click()
//}
//---above: functionality for producing JSON file


function readSingleFile(evt) {
  //Parses sherlock holmes text to json markov chain
  //the unique format of the text allows for easy parsing
  //actual story text is indented with 5 spaces only

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
        if (line.length > 5 && line[5] !== ' ') {
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

document.getElementById('fileinput').addEventListener('change', readSingleFile, false);
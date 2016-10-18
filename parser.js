
//custom inputfilter for sherlock holmes lines of text
//actual lines of story text is indented with 5 spaces only
var myFilter = function(string) {
  return (string.length > 5 && string[5] !== ' ');
}

//turns blob of text into 
var parseBlob = function(string) {
  var rows = string.split(/\r?\n/g);
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
  return sentences;
}


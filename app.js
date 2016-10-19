angular.module('app', []).controller('appCtrl', ['$scope', function($scope) {
  $scope.add = function() {
    var f = document.getElementById('file').files[0],
        r = new FileReader();
    r.onloadend = function(e){
      $scope.status='parsing to sentences...';
      var data = e.target.result;
      var arr = parseBlob(data);
      $scope.status='parsing to markov graph...';
      parseLines(arr);
      $scope.status='ready';
    }
    r.readAsText(f);
  };

  $scope.generate = function() {
    var arr = generate(10);
    $scope.status = arr.slice(1).join(' ');
  }
}]);
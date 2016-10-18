angular.module('app', []).controller('appCtrl', ['$scope', function($scope) {
  $scope.add = function() {
    $scope.test = 'hi';
    var f = document.getElementById('file').files[0],
        r = new FileReader();
    r.onloadend = function(e){
      var data = e.target.result;
      console.log(data);
    }
    r.readAsText(f);
  };
}]);
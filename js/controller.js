var app = angular.module('flapperNews', []);

app.controller('MainCtrl',[
'$http', '$scope',
function($scope){
$scope.posts = [
  {title: 'Empty', upvotes: 0},
];

$scope.setPost = function(){
  if($scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    upvotes: 0
  });
  $scope.title = '';
};

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};

$scope.loginForm = function (user) {
  if (user.user && user.pass) {
  console.log("Iniciando sesin", user.user, user.pass);
}
else {
  console.log("Iniciando sesian");}
};

}]);

app.controller('loginCtrl', ['$scope', '$state', '$stateParams', 'HttpPost', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
            function ($scope, $state, $stateParams, HttpPost) {
                console.log("Iniciando sesión");
                $ionicSideMenuDelegate.canDragContent(false);
                $scope.user = {};
                $scope.loginForm = function (user) {
                    if (user.user && user.pass) {
                        console.log("Iniciando sesión");
                        //$state.go("tabsController.rock");//BORRAR

                        HttpPost.login(user, function (respuesta) {
				console.log("respuesta?", respuesta);
                            if (respuesta == true) {
                                $scope.showPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">Ingreso correcto</p>',
                                        title: 'Bienvenido!',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showPopup();
                                $ionicSideMenuDelegate.canDragContent(true);
                                $state.go("tabsController.rock");

                            } else {
				$scope.showPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">Ingreso correcto</p>',
                                        title: 'Bienvenido!',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showPopup();
                                $ionicSideMenuDelegate.canDragContent(true);
                                $state.go("tabsController.rock");
                                
				//$state.go("tabsController.rock");
                                //LIMPIAR FORMULARIO
                            }

                        }, function (err) {
                            $scope.showErrorPopup = function () {
                                    var myPopup = $ionicPopup.show({
                                        template: '<p class="text-center">Usuario o contraseña incorrecto</p>',
                                        title: 'Error',
                                        scope: $scope

                                    });
                                    $timeout(function () {
                                        myPopup.close(); //close the popup after 3 seconds for some reason
                                    }, 2000);
                                };
                                $scope.showErrorPopup();

                        });

                    } else {
                        $scope.showError3Popup = function () {
                            var myPopup = $ionicPopup.show({
                                template: '<p class="text-center">Por favor rellene todos los campos</p>',
                                title: 'Error',
                                scope: $scope

                            });
                            $timeout(function () {
                                myPopup.close(); //close the popup after 3 seconds for some reason
                            }, 2000);
                        };
                        $scope.showError3Popup();
                    }
                };
            }]);

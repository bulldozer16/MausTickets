var app = angular.module("MausTickets", []);

app.controller("eventCtrl", function($scope, $http) {
	$scope.eventname = "";
	//$scope.province = "";
	$scope.ticketsNumber = 0;
	$scope.description = "";
	$scope.sold_tickets = 0;
	$scope.ticketsPrice = 0;

	$scope.addEvent = function () {
		if ($scope.eventname && $scope.ticketsNumber && $scope.description && $scope.sold_tickets && $scope.ticketsPrice){
			console.log("I AM HERE");
			$http.post("http://192.168.100.21:3000/events", {
		    		name: $scope.eventname,
				province: "",
				available_tickets: $scope.ticketsNumber,
				description: $scope.description,
				sold_tickets: 0,
				ticket_price: $scope.ticketsPrice
			})
			.success(function (data, status, headers, config) {
				console.log(data.description);        
			})
			.error(function (data, status, headers, config) {
		    		window.alert("No se pudo ingresar el evento");
			});
		}
		else{
			window.alert("Debe rellenar la informacion solicitada");
		}
	}
});

app.controller("loginCtrl", function($scope, $http) {
	$scope.username = "";
	$scope.password = "";
	$scope.state = -1;

	$scope.ingreso = function () {
		if ($scope.user && $scope.pass){
			console.log("I AM HERE");
			$http.post("http://192.168.100.21:3000/users/login", {
		    		username: $scope.user,
				password: $scope.pass
			})
			.success(function (data, status, headers, config) {
				console.log(data);
		    		$scope.state = data;
				if (data == 1)
					window.location = "admin.html"; 
				else if (data == 2)
					window.location = "start.html"; 
				else
					window.alert("Nombre de usuario o clave incorrecta");         
			})
			.error(function (data, status, headers, config) {
		    		window.alert("Debe rellenar la informacion solicitada");
			});
		}
		else{
			window.alert("Debe rellenar la informacion solicitada");
		}
	}
});

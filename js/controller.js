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

app.controller("register", function($scope, $http) {
	$scope.username = "";
	$scope.password = "";
	$scope.name = "";
	$scope.last_name = "";
	$scope.genre = true;
	$scope.card_number = "";
	$scope.expire_month = "";
	$scope.expire_year = "";
	$scope.province = "";
	$scope.canton = "";
	$scope.age = "";

	$scope.registrar = function() {
		if ($scope.genre == "1") {$scope.genre = true;}
		else {$scope.genre = false};
	
		var expire = $scope.expire_month + "/" + $scope.expire_year;

		$http.post("http://192.168.100.21:3000/users", {
            		type: "User",
			username: $scope.username,
			password: $scope.password,
			name: $scope.name,
			last_name: $scope.last_name,
			genre: $scope.genre,
			province: $scope.province,
			canton: $scope.canton,
			card_number: $scope.card_number,
			expire_date: expire,
			age: $scope.age,
			artists: "",
			teams: "",
			picture: ""
        	})
        	.success(function (data, status, headers, config) {
			console.log(data);
        	})
        	.error(function (data, status, headers, config) {
            		console.log(error);
        	});
	}
});

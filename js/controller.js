var app = angular.module("MausTickets", []);

app.controller("eventCtrl", function($scope, $http) {
	$scope.eventname = "";
	//$scope.province = "";
	$scope.ticketsNumber = 0;
	$scope.description = "";
	$scope.sold_tickets = 0;
	$scope.ticketsPrice = 0;

	$scope.addEvent = function () {
		if ($scope.eventname && $scope.ticketsNumber && $scope.description && $scope.ticketsPrice){
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

app.controller("editar_evento", function($scope, $http) {
	$scope.events = [];
	$scope.nombre = "Editar nombre";
	$scope.entradas = "Agregar entradas";
	$scope.precio = "Editar precio";
	$scope.descripcion = "Editar descripcion";
	$scope.entradas_previas = 0;	
	$scope.vendidos = 0;

	$http.get("http://192.168.100.21:3000/events")
    	.success(function(data){         
        	$scope.events = data;
		console.log(data);
    	})
    	.error(function(err){
    	});

	$scope.set_shit = function(event) {
		$scope.nombre = event.name;
		$scope.entradas = event.available_tickets;
		$scope.entradas_previas = $scope.entradas;
		$scope.precio = event.ticket_price;
		$scope.descripcion = event.description;
		$scope.vendidos = event.sold_tickets;
	}

	$scope.actualizar = function() {
		$http.post("http://192.168.100.21:3000/events/update", {
			name: $scope.nombre,
			available_tickets: $scope.entradas,
			sold_tickets: $scope.vendidos,
			ticket_price: $scope.precio,
			description: $scope.descripcion
		})
		.success(function (data, status, headers, config) {
			console.log(data);
			window.alert("Evento actualizado");
		})
		.error(function (data, status, headers, config) {
	    		window.alert("Error");
		});
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
			artists: $scope.bands,
			teams: $scope.teams,
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

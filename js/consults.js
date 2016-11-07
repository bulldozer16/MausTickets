var app = angular.module("MausTickets", []);

app.controller("consultas", function($scope, $http) {
	$scope.flag = 0;
	$scope.title = [];
	$scope.selected_event = "";
	$scope.result = [];
	$scope.events = [];

	$http.get("http://192.168.100.21:3000/events")
    	.success(function(data){         
        	$scope.events = data;
		console.log(data);
    	})
    	.error(function(err){
    	});

	$scope.consulta1 = function () {
		$scope.flag = 1;
		$scope.title = ["Evento", "Masculino", "Femenino"];
		$http.post("http://192.168.100.21:3000/transactions/tickets_genre", {
            		name: $scope.selected_event
        	})
        	.success(function (data, status, headers, config) {
			console.log(data);
            		$scope.result = data;           
        	})
        	.error(function (data, status, headers, config) {
            		console.log(error);
        	});
	}

	$scope.consulta2 = function () {
		$scope.flag = 2;
		$scope.title = ["Evento", "San Jose", "Alajuela", "Cartago", "Heredia", "Puntarenas", "Guanacaste", "Limon"];
		$http.post("http://192.168.100.21:3000/transactions/tickets_province", {
            		name: $scope.selected_event
        	})
        	.success(function (data, status, headers, config) {
			console.log(data);
            		$scope.result = data;           
        	})
        	.error(function (data, status, headers, config) {
            		console.log(error);
        	});
	}

	$scope.consulta3 = function () {
		$scope.flag = 3;
		$scope.title = ["Evento", "Monto total ($)"];
		$http.get("http://192.168.100.21:3000/transactions/sales_by_event")
        	.success(function(data)	{         
        		$scope.result = data;
			console.log(data);
    		})
    		.error(function(err){
    		});
	}

	$scope.consulta4 = function () {
		$scope.flag = 4;
		$scope.title = ["Provincia", "Monto total ($)"];
		$http.get("http://192.168.100.21:3000/transactions/sales_by_province")
        	.success(function(data)	{         
        		$scope.result = data;
			console.log(data);
    		})
    		.error(function(err){
    		});
	}

	$scope.consulta5 = function () {
		$scope.flag = 5;
		$scope.title = ["Evento", "Entradas"];
		$http.get("http://192.168.100.21:3000/events")
        	.success(function(data)	{         
        		$scope.result = data;
			console.log(data);
    		})
    		.error(function(err){
    		});
	}

	$scope.consulta6 = function () {
		$scope.flag = 6;
		$scope.title = ["Client", "Entradas"];
		$http.get("http://192.168.100.21:3000/transactions/tickets_by_client")
        	.success(function(data)	{         
        		$scope.result = data;
			console.log(data);
    		})
    		.error(function(err){
    		});
	}
});

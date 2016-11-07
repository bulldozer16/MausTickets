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

app.controller("loginCtrl", function($scope, $http) {
	$scope.username = "";
	$scope.password = "";
	$scope.state = -1;

	$scope.ingreso = function () {
		usuario = $scope.user;
		if ($scope.user && $scope.pass){
			$http.post("http://192.168.100.21:3000/users/login", {
		    		username: $scope.user,
				password: $scope.pass
			})
			.success(function (data, status, headers, config) {
		    		$scope.state = data;
				if (data == 1)
					window.location = "admin.html"; 
				else if (data == 2){
					//$rootScope.globals = $scope.user;
 					//$cookieStore.put('globals', $rootScope.globals);
					//$rootScope.username = $scope.user;
					localStorage.setItem('username', usuario);
					console.log(localStorage.getItem('username'));
					window.location = "start.html"; 
				}
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

app.controller("profile", function($scope, $http) {
	console.log(localStorage.getItem('username'));
	usuario = localStorage.getItem('username');
	$http.get("http://192.168.100.21:3000/users/"+ usuario)
        	.success(function (data, status, headers, config) { 
			console.log("AQUI");
			$scope.userdata = data;
			document.getElementById("un").value = data[0].username;
			document.getElementById("up").value = data[0].password;
			document.getElementById("n").value = data[0].name;
			document.getElementById("l").value = data[0].last_name;
			document.getElementById("ntc").value = data[0].card_number;
			if (data[0].genre)
				document.getElementById("h").checked = true;
			else
				document.getElementById("m").checked = true;
			document.getElementById("selectOpt1").value = data[0].province;
			//document.getElementById("labelCanton").value = data[0].canton;
			$scope.labelCant = data[0].canton;
			$scope.labelDate = data[0].expire_date;
			document.getElementById("dob-age").value = data[0].age;
			document.getElementById("b").value = data[0].artists;
			document.getElementById("t").value = data[0].teams;       
        	})
        	.error(function (data, status, headers, config) {
            		console.log(error);
        	});

	$scope.editar = function() {
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

function changePlace(){
              var list1 = document.getElementById("selectOpt1");
              var myselect = list1.options[list1.selectedIndex].value;
              var list2 = document.getElementById('selectOpt2');
              for (i = list2.options.length - 1; i >= 0; i--) {
                list2.options[i] = null;
              }
              if(myselect==="San Jose"){
                var opt = document.createElement('option');
                opt.value = "San Jose";
                opt.innerHTML = "San Jose";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Escazu";
                opt.innerHTML = "Escazu";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Desamparados";
                opt.innerHTML = "Desamparados";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Puriscal";
                opt.innerHTML = "Puriscal";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Tarrazu";
                opt.innerHTML = "Tarrazu";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Aserri";
                opt.innerHTML = "Aserri";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Mora";
                opt.innerHTML = "Mora";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Goicoechea";
                opt.innerHTML = "Goicoechea";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Santa Ana";
                opt.innerHTML = "Santa Ana";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Alajuelita";
                opt.innerHTML = "Alajuelita";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Vazquez de Coronado";
                opt.innerHTML = "Vazquez de Coronado";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Acosta";
                opt.innerHTML = "Acosta";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Tibas";
                opt.innerHTML = "Tibas";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Moravia";
                opt.innerHTML = "Moravia";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Montes de Oca";
                opt.innerHTML = "Montes de Oca";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Turrubares";
                opt.innerHTML = "Turrubares";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Dota";
                opt.innerHTML = "Dota";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Curridabat";
                opt.innerHTML = "Curridabat";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Perez Zeledon";
                opt.innerHTML = "Perez Zeledon";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Leon Cortes";
                opt.innerHTML = "Leon Cortes";
                list2.appendChild(opt);
              }
else if(myselect==="Cartago"){
                var opt = document.createElement('option');
                opt.value = "Cartago";
                opt.innerHTML = "Cartago";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Paraiso";
                opt.innerHTML = "Paraiso";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "La Union";
                opt.innerHTML = "La Union";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Jimenez";
                opt.innerHTML = "Jimenez";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Turrialba";
                opt.innerHTML = "Turrialba";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Alvarado";
                opt.innerHTML = "Alvarado";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Oreamuno";
                opt.innerHTML = "Oreamuno";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "El Guarco";
                opt.innerHTML = "El Guarco";
                list2.appendChild(opt);
              }
              else if(myselect==="Alajuela"){
                var opt = document.createElement('option');
                opt.value = "Alajuela";
                opt.innerHTML = "Alajuela";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "San Ramon";
                opt.innerHTML = "San Ramon";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Grecia";
                opt.innerHTML = "Grecia";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "San Mateo";
                opt.innerHTML = "San Mateo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Atenas";
                opt.innerHTML = "Atenas";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Naranjo";
                opt.innerHTML = "Naranjo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Palmares";
                opt.innerHTML = "Palmares";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Poas";
                opt.innerHTML = "Poas";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Orotina";
                opt.innerHTML = "Orotina";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Naranjo";
                opt.innerHTML = "Naranjo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Zarcero";
                opt.innerHTML = "Zarcero";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Valverde Vega";
                opt.innerHTML = "Valverde Vega";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Upala";
                opt.innerHTML = "Upala";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Los Chiles";
                opt.innerHTML = "Los Chiles";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Guatuso";
                opt.innerHTML = "Guatuso";
                list2.appendChild(opt);
              }
else if(myselect==="Heredia"){
                var opt = document.createElement('option');
                opt.value = "Heredia";
                opt.innerHTML = "Heredia";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Barva";
                opt.innerHTML = "Barva";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Santo Domingo";
                opt.innerHTML = "Santo Domingo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Santa Barbara";
                opt.innerHTML = "Santa Barbara";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "San Rafael";
                opt.innerHTML = "San Rafael";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "San Isidro";
                opt.innerHTML = "San Isidro";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Belen";
                opt.innerHTML = "Belen";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Flores";
                opt.innerHTML = "Flores";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "San Pablo";
                opt.innerHTML = "San Pablo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Sarapiqui";
                opt.innerHTML = "Sarapiqui";
                list2.appendChild(opt);
              }
else if(myselect==="Guanacaste"){
                var opt = document.createElement('option');
                opt.value = "Liberia";
                opt.innerHTML = "Liberia";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Nicoya";
                opt.innerHTML = "Nicoya";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Santa Cruz";
                opt.innerHTML = "Santa Cruz";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Bagaces";
                opt.innerHTML = "Bagaces";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Carrillo";
                opt.innerHTML = "Carrillo";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Abangares";
                opt.innerHTML = "Abangares";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Tilaran";
                opt.innerHTML = "Tilaran";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Nandayure";
                opt.innerHTML = "Nandayure";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Ca&#241as";
                opt.innerHTML = "Ca&#241as";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "La Cruz";
                opt.innerHTML = "La Cruz";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Hojancha";
                opt.innerHTML = "Hojancha";
                list2.appendChild(opt);
              }
else if(myselect==="Puntarenas"){
                var opt = document.createElement('option');
                opt.value = "Puntarenas";
                opt.innerHTML = "Puntarenas";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Esparza";
                opt.innerHTML = "Esparza";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Buenos Aires";
                opt.innerHTML = "Buenos Aires";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Montes de Oro";
                opt.innerHTML = "Montes de Oro";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Osa";
                opt.innerHTML = "Osa";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Quepos";
                opt.innerHTML = "Quepos";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Golfito";
                opt.innerHTML = "Golfito";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Coto Brus";
                opt.innerHTML = "Coto Brus";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Parrita";
                opt.innerHTML = "Parrita";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Corredores";
                opt.innerHTML = "Corredores";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Garabito";
                opt.innerHTML = "Garabito";
                list2.appendChild(opt);
              }
else if(myselect==="Limon"){
                var opt = document.createElement('option');
                opt.value = "Limon";
                opt.innerHTML = "Limon";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Pococi";
                opt.innerHTML = "Pococi";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Siquirres";
                opt.innerHTML = "Siquirres";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Talamanca";
                opt.innerHTML = "Talamanca";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Matina";
                opt.innerHTML = "Matina";
                list2.appendChild(opt);
var opt = document.createElement('option');
                opt.value = "Guacimo";
                opt.innerHTML = "Guacimo";
                list2.appendChild(opt);
              }
            }

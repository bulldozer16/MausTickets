var app = angular.module("MausTickets", []);

app.controller("consultas", function($scope, $http) {
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
});





























/*function cantEntEvent() 
{
	var x = document.getElementById("myTable");
	var length = x.rows.length;
	console.log(length);
	for (i = length - 1; i >= 1; i--) 
	{
		x.deleteRow(i);
	}

//document.getElementById("myTable").reset();
             // var x = document.getElementById("myTable").rows[0].cells;
	var x = document.getElementById("myTable");
	      //x[0].innerHTML = "NEW CONTENT";
	var row = x.insertRow(1);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);

// Add some text to the new cells:
	cell1.innerHTML = "NEW CELL1";
	cell2.innerHTML = "NEW CELL2";
}

function cantEntEventASex()
{
//document.getElementById("myTable").reset();
             // var x = document.getElementById("myTable").rows[0].cells;
	var x = document.getElementById("myTable");
	var length = x.rows.length;
	console.log(length);
	for (i = length - 1; i >= 1; i--) 
	{
		x.deleteRow(i);
	}
}*/



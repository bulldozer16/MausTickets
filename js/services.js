var server = 'http://192.168.100.1:69';

angular.module('app.services', [])
        .factory('HttpGet', function ($http) {
            return {
                getMecer: function () {
                    // $http returns a promise, which has a then function, which also returns a promise.
                    var part = '/movement';
                    var url = server.concat(part);
                    //console.log('Solicito: ', url)
                    return $http.get(url).then(function (response) {
                        // In the response, resp.data contains the result. Check the console to see all of the data returned.
                        //console.log('Get mecer', response, response.data);
                        return response.data.movement;
                    })
                },
                getSonido: function () {
                    var part = '/crying';
                    var url = server.concat(part);
                    //console.log('Solicito: ', url);
                    return $http.get(url).then(function (response) {
                        //console.log('Get sonido', response, response.data);
                        return response.data.crying;
                    })
                },
		getProximidad: function () {
                    var part = '/proximity';
                    var url = server.concat(part);
                    //console.log('Solicito: ', url);
                    return $http.get(url).then(function (response) {
                        //console.log('Get proximidad', response, response.data);
                        return response.data.proximity;
                    });
                }
            };
        })

        .factory('HttpPost', function ($http) {
            return {
                login: function (info, callback, err) {
                    console.log("login");
                    return $http({
                        method: "POST",
			json: true,
                        url: server + '/users/login',
                        data: {
                            "username": info.user,
                            "password": info.pass
                        }, headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function(response) {
            // success
console.log('SUCCESS?', info.valor);
    }, 
    function(response) { // optional
            // failed
console.log('GET OWNED', info.valor);
    })
             
         .factory('HttpPost2', function ($http) {   
	    return {  
                mov:function (info, callback, err) {
		    console.log('Get POST', info.valor);
                    return $http({
        url: server + '/movement',
	json: true,
        method: "POST",
        data: Object.toparams({'engine': info.valor}),
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response) {
            // success
console.log('SUCCESS?', info.valor);
    }, 
    function(response) { // optional
            // failed
console.log('GET OWNED', info.valor);
    });
                }
            };
        });

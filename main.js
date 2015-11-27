// Cotrola las rutas, es el nucleo de la aplicacion
// 1. Creo el modulo router que hace uso del modulo ngRoute
var router = angular.module('routerApp', ['ngRoute', 'firebase', 'forms'])

// Configuración de las rutas
router.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'login.html',
			controller 	: 'loginCtrl'
		})
		.when('/registro', {
			templateUrl : 'registro.html',
			controller 	: 'registroCtrl'
		})
		.when('/dashboard', {
			templateUrl : 'acciones.html', // aca debe de redirigir al dashboard
			controller  : 'dashboardCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// --------------------------------------- Controladores--------------------------------------
// url de la BD en Firebase: rentas.firebaseIO.com 
// 1. Controlador del Login
router.controller('loginCtrl', function($scope, $firebaseSimpleLogin, $location) {
	var firebase_object = new Firebase('https://rentas.firebaseIO.com')
	var login_object = $firebaseSimpleLogin(firebase_object) // Objeto simplelogin proporcionado por firebase
	$scope.user = {}

	//Funcion para logear Usuarios
	$scope.login = function(e) {
		e.preventDefault()
		var username = $scope.user.email
		var password = $scope.user.password
		login_object.$login('password', {
				email : username,
				password: password
			})
			.then(function(user) {
				// Acá vendra el flujo si el usuario se puedo autentificar con exito 
				//$location.path('/dashboard')
				console.log('Exito !!, has sido autentificado')
			}, function(error) {
				console.log('ERROR al autentificar')
			});

	}

	//funcion para autenticacion federada
	$scope.auth_federada = function(red_social) {
				
		firebase_object.authWithOAuthPopup(red_social, function (error, authData) {
		// body...
			if (error) {
				console.log("Error al autentificar con "+red_social)
			}else{
				console.log("Exito al autentificar con "+red_social+" ",authData);
			}
		})
		
	}

	// // Funcion para logear con Twitter
	// $scope.login_twitter = function() {
	// 	firebase_object.authWithOAuthPopup("twitter", function (error, authData) {
	// 		// body...
	// 		if (error) {
	// 			console.log("Error al autentificar con Twitter")
	// 		}else{
	// 			console.log("Exito al autentificar con Twitter", authData);
	// 		}
	// 	})
	// }
	// }

	// // Funcion para logear con Google
	// $scope.login_google = function() {

	// }
});

//2. Controlador de registro de usuarios
router.controller('registroCtrl', function($scope) {
	$scope.hola_mundo = 'Hola Registro'
	console.log($scope.hola_mundo)
	// controller-body
});

//3. Controlador del Dashboard
router.controller('dashboardCtrl', function($scope) {

});
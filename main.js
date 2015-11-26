// Cotrola las rutas, es el nucleo de la aplicacion
// 1. Creo el modulo router que hace uso del modulo ngRoute
var router = angular.module('routerApp', ['ngRoute'])

// Configuración de las rutas
router.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'pages/login.html',
			controller 	: 'loginCtrl'
		})
		.when('/registro', {
			templateUrl : 'pages/registro.html',
			controller 	: 'registroCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// --------------------------------------- Controladores--------------------------------------
// url de la BD en Firebase: rentas.firebaseIO.com 
// 1. Controlador del Login
router.controller('loginCtrl', function($scope) {
	$scope.hola_mundo = 'Hola Login'
	console.log($scope.hola_mundo)
	//controller-body
});

//2. Controlador de registro de usuarios
router.controller('registroCtrl', function($scope) {
	$scope.hola_mundo = 'Hola Registro'
	console.log($scope.hola_mundo)
	// controller-body
});
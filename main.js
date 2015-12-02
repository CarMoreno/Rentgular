// Cotrola las rutas, es el nucleo de la aplicacion
// 1. Creo el modulo router que hace uso del modulo ngRoute
var router = angular.module('routerApp', ['firebase', 'ngRoute','forms'])

// Configuración de las rutas
router.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl	: 'views/login.html',
			controller 	: 'loginCtrl'
		})
		.when('/registro', {
			templateUrl : 'views/registro.html',
			controller 	: 'registroCtrl'
		})
		// .when('/ahorros', {
		// 	templateUrl : 'views/.html',
		// 	controller 	: 'dashboardCtrl'
		// })
		.when('/dashboard', {
			templateUrl : 'views/acciones.html', // aca debe de redirigir al dashboard
			controller  : 'dashboardCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// --------------------------------------- Controladores--------------------------------------
// url de la BD en Firebase: rentas.firebaseIO.com 
// 1. Controlador del Login
router.controller('loginCtrl', function($scope, $firebaseAuth, $location) {
	var firebaseRef = new Firebase('https://rentas.firebaseIO.com')
	var autenticacion = $firebaseAuth(firebaseRef) // Objeto firebaseAuth proporcionado por firebase
	$scope.user = {}

	//Funcion para logear Usuarios
	$scope.login = function(e) {
		e.preventDefault()
		var username = $scope.user.email
		var password = $scope.user.password
		autenticacion.$authWithPassword({
			email : username,
			password : password
		}).then(function(datos_autenticacion) {
			console.log("EXITO e el logueo",datos_autenticacion)
			$location.path("/dashboard")
		}).catch(function(error) {
			console.log("ERROR en el logue", error)
		});

	}

	//funcion para autenticacion federada
	$scope.auth_federada = function(red_social) {
				
		autenticacion.$authWithOAuthPopup(red_social)
			.then(function(datos_autenticacion) {
				console.log("EXITO AL AUTENTICAR CON "+red_social+"",datos_autenticacion)
			})
			.catch(function(error) {
				console.log("ERROR AL AUTENTICAR CON "+red_social+"",error)
			})
		
	}
});

//2. Controlador de registro de usuarios
router.controller('registroCtrl', function($scope, $firebaseAuth) {
	// $scope.hola_mundo = 'Hola Registro'
	// console.log($scope.hola_mundo)
	// controller-body
	var firebaseRef = new Firebase('https://rentas.firebaseIO.com')
	var registro = $firebaseAuth(firebaseRef) // Objeto firebaseAuth proporcionado por firebase
	$scope.user_register = {}
	console.log("password = "+$scope.user_register.password +" -- "+"password2 = "+$scope.user_register.password2)
	$scope.crearUsuario = function(e) {
		e.preventDefault() // Para que a pagina no se refresque cuando estemos en la gestion de registar un nuevo usuario, pueden generarse errores. 
		registro.$createUser({
			email: $scope.user_register.email,
			password: $scope.user_register.password
		}).then(function(data_users) {
			console.log("EXITO, Usuario Creado con uid ",data_users.uid)
		}).catch(function(error) {
			console.log("ERROR al crear usuario :(",error)
		});
	};
});

//3. Controlador del Dashboard
router.controller('dashboardCtrl', function($scope) {

});
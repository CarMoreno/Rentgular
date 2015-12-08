// Cotrola las rutas, es el nucleo de la aplicacion
var rentgular = angular.module('rentgularApp')
// Configuración de las rutas
rentgular.config(function($routeProvider) {

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
		// 	controller 	: 'dashboardCtrl',
		// 	paginaActiva: '#ahorros'
		// })
		.when('/dashboard', {
			templateUrl : 'views/dashboard.html', // aca deberá de redirigir al dashboard
			controller  : 'dashboardCtrl',
			paginaActiva  : '#dashboard' //Url activa en ese momento, cada ruta debe de tener esta clave
		})
		.otherwise({
			redirectTo: '/'
		});
});
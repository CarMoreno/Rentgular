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
		.when('/dashboard', {
			templateUrl : 'views/dashboard.html', // aca deberá de redirigir al dashboard
			controller  : 'dashboardCtrl',
			paginaActiva  : '#dashboard' //Url activa en ese momento, cada ruta debe de tener esta clave
		})
		.when('/ingresos', {
			templateUrl : 'views/ingresos.html',
			controller 	: 'ingresosCtrl',
			paginaActiva: '#ingresos'
		})
		.when('/compras',{
			templateUrl : 'views/compras.html',
			controller  : 'comprasCtrl',
			paginaActiva: '#compras'
		})
		.when('/pagosalario',{
			templateUrl : 'views/pagosalario.html',
			controller  : 'pagoSalarioCtrl',
			paginaActiva: '#pagosalario'
		})
		.when('/servicios', {
			templateUrl : 'views/servicios.html',
			controller  : 'serviciosPublicosCtrl',
			paginaActiva: '#servicios'
		})
		.when('/serviciosge', {
			templateUrl : 'views/serviciosge.html',
			controller  : 'serviciosGeneralesCtrl',
			paginaActiva: '#serviciosge'
		})
		.when('/egresos', {
			templateUrl : 'views/egresos.html',
			controller  : 'egresosCtrl',
			paginaActiva: '#egresos'
		})
		.otherwise({
			redirectTo: '/'
		});
});
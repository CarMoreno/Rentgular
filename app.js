/** 
*Los modulos que tenemos son:
*- cgNotify : Módulo para el manejo de notificaciones: https://github.com/cgross/angular-notify.
* 			Se inyecta notify en el controlador.
*- firebase : Módulo para poder usar la libreria de firebase, sus metodos y objetos
* 			se inyecta $firebaseArray o $firebaseObject o $firebaseSimpleLogin, entre otros
*- ngRoute : Módulo para manejar las rutas de la aplicacion, se inyecta $route
**/
angular.module('rentgularApp', [
	'cgNotify',
	'firebase', 
	'ngRoute'
])
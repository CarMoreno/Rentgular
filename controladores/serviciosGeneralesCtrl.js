var rentgular = angular.module('rentgularApp')
rentgular.controller('serviciosGeneralesCtrl', ['servicioAuth', '$scope', '$route',
	function(servicioAuth, $scope, $route) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//console.log($scope.ref.$getAuth().password.email)
	}
])
var rentgular = angular.module('rentgularApp')
rentgular.controller('patrimonioCtrl', ['servicioAuth', 'servicioNoti', '$scope', '$route', 
	function(servicioAuth, servicioNoti, $scope, $route) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.noti = servicioNoti
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado

				
		// $scope.misCompras.$loaded()
		// 	.then(function() {
		// 		angular.forEach($scope.misCompras, function(compra) {
		// 			$scope.totalCompras += compra.valor
		// 		})
		// 		$scope.noti.debe_declarar($scope.totalIngresos)
		// 	})
	}
])
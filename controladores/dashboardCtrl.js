var rentgular = angular.module('rentgularApp')
rentgular.controller('dashboardCtrl', ['servicioAuth', '$scope', '$route',
	function(servicioAuth, $scope, $route) {
		$scope.ruta = $route
		$scope.datos = servicioAuth.$getAuth()
		console.log("ANTES : ", $scope.datos)
		$scope.logOut = servicioAuth.$unauth()
		console.log("DESPUES: ", $scope.datos)
	}
])
var rentgular = angular.module('rentgularApp')
rentgular.controller('serviciosPublicosCtrl', ['servicioAuth', '$scope', '$route', '$firebaseArray',
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		console.log($scope.ref.$getAuth().password.email)
		var serviciosRef = new Firebase('https://rentas.firebaseIO.com/egresos/servicios_publicos')
		$scope.arrayServicosPublicos = $firebaseArray(serviciosRef)
		$scope.pagoDatos = {}
		$scope.totalServicios = 0
		//Esta variable de scope guarda una funcion anonima,
		//esta es para Anadir datos de pago de servicios a la BD
		$scope.pago = function() {
			$scope.arrayServicosPublicos.$add({
				id_usuario: $scope.ref.$getAuth().uid,
				valor: $scope.pagoDatos.valor,
				concepto: $scope.pagoDatos.concepto
			})
			
		}

		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.arrayServicosPublicos.$loaded()
			.then(function() {
				angular.forEach($scope.arrayServicosPublicos, function(servicioPublico) {
					$scope.totalServicios += servicioPublico.valor
					console.log($scope.totalServicios)	
				})
			})
	}
])
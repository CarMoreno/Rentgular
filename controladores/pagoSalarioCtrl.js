var rentgular = angular.module('rentgularApp')
rentgular.controller('pagoSalarioCtrl', ['servicioAuth','$scope', '$route', '$firebaseArray',
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		console.log('hola pagoSalario')
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {} // objeto donde se guarda lo de cambio de contraseña
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//------------------------------------------------------------------------------
		var egresosRef = new Firebase('https://rentas.firebaseIO.com/egresos')
		$scope.arrayEgresos = $firebaseArray(egresosRef)
		$scope.pagoDatos = {}
		$scope.total = 0
		
		//Esta variable de scope guarda una funcion anonima,
		//esta es para Anadir datos de pago de salarios a la BD
		$scope.pago = function() {
			$scope.arrayEgresos.$add({
				id_usuario: $scope.ref.$getAuth().uid,
				valor: $scope.pagoDatos.valor,
				descripcion: $scope.pagoDatos.descripcion
			})
			
		}

		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.arrayEgresos.$loaded()
			.then(function() {
				angular.forEach($scope.arrayEgresos, function(egreso) {
					$scope.total += egreso.valor
					//console.log($scope.total)	
				})
			})

	}
])
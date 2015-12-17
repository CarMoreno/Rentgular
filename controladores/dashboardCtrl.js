var rentgular = angular.module('rentgularApp')
rentgular.controller('dashboardCtrl', ['servicioAuth', 'servicioNoti', '$scope', '$route', '$firebaseArray',
	function(servicioAuth, servicioNoti, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio de autenticacion
		$scope.noti = servicioNoti // Objeto que retorna el servicio de notificacioes
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//------------------------------------------------------------------------------
		var ingresosRef = new Firebase('http://rentas.firebaseIO.com/ingresos')
		//Referencias para los egresos, es necesari, puesto que los tengo en nodos independientes
		var comprasRef = new Firebase('http://rentas.firebaseIO.com/egresos/compras')
		var pagosSalariosRef = new Firebase('http://rentas.firebaseIO.com/egresos/pagos_salarios')
		var serviciosPublicosRef = new Firebase('http://rentas.firebaseIO.com/egresos/servicios_publicos')
		//Declaro los arrays para cada movimiento (ingresos o egresos: compras, pagos de salarios, servicios publicos)
		$scope.arrayUltimasCompras = $firebaseArray(comprasRef)
		$scope.arrayUltimosPagos = $firebaseArray(pagosSalariosRef)
		$scope.arrayUltimosPagosServicios = $firebaseArray(serviciosPublicosRef)
		$scope.arrayUltimosIngresos = $firebaseArray(ingresosRef)
		
		//Setea el array de ingresos con los ultimos dos ingresos del usuario logueado
		// actualemnte.
		function get_ultimos_ingresos() {
			var query = ingresosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid).limitToLast(2)
			$scope.arrayUltimosIngresos = $firebaseArray(query)	
		}

		// Setea tres arrays, los correspondientes a los egresos:
		// - Array de compras
		// - Array de servicios publicos
		// -Array de pago de salarios
		function get_ultimos_egresos() {
			//Realizamos las consultas
			var query_compras = comprasRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid).limitToLast(1)
			var query_pago_salarios = pagosSalariosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid).limitToLast(1)
			var query_servicios_publicos = serviciosPublicosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid).limitToLast(1)
			
			$scope.arrayUltimasCompras = $firebaseArray(query_compras)
			$scope.arrayUltimosPagos = $firebaseArray(query_pago_salarios)
			$scope.arrayUltimosPagosServicios = $firebaseArray(query_servicios_publicos)
			//console.log($scope.arrayUltimosPagosServicios)
		}
		// Llamamos a las funciones que controlan los ultimos movimientos
		get_ultimos_ingresos()
		get_ultimos_egresos()

	}
])
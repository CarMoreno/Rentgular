var rentgular = angular.module('rentgularApp')
rentgular.controller('pagoSalarioCtrl', ['servicioAuth','$scope', '$route', '$firebaseArray',
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {} // objeto donde se guarda lo de cambio de contraseña
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//------------------------------------------------------------------------------
		var pagosSalariosRef = new Firebase('https://rentas.firebaseIO.com/egresos/pagos_salarios')
		$scope.arrayEgresos = $firebaseArray(pagosSalariosRef)
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


		/**
		 * [remover Elimina un registro seleccionado]
		 * @param  {[Array]} dato [El registro que debe ser eliminado]
		 */
		$scope.remover = function(dato) 
		{
			var indice = $scope.arrayEgresos.$indexFor(dato.$id)//Se obtiene el indice del registro en la bd con un id determinado
			$scope.arrayEgresos.$remove(indice)//Se elimina el registro ubicado en el indice indicado

		}


		function cargar_datos()
		{
			//Se muestran los salarios
			var query = pagosSalariosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid)
			$scope.miSalario = $firebaseArray(query)
		}

		cargar_datos()


		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.miSalario.$loaded()
			.then(function() {
				angular.forEach($scope.miSalario, function(egreso) {
					$scope.total += egreso.valor	
				})
			})

	}
])
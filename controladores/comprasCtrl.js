var rentgular = angular.module('rentgularApp')
rentgular.controller('comprasCtrl', ['servicioAuth', 'servicioNoti', '$scope', '$route', '$firebaseArray','notify',
	function(servicioAuth, servicioNoti, $scope, $route, $firebaseArray, notify) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.noti = servicioNoti
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//------------------------------------------------------------------------------
		var comprasRef = new Firebase('https://rentas.firebaseIO.com/egresos/compras')
		$scope.arrayCompras = $firebaseArray(comprasRef)
		$scope.pagoDatos = {}
		$scope.totalCompras = 0

		//Esta variable de scope guarda una funcion anonima,
		//esta es para Anadir datos de pago de salarios a la BD
		$scope.pago = function() {
			$scope.arrayCompras.$add({
				propietario: $scope.ref.$getAuth().uid,
				valor: $scope.pagoDatos.valor,
				descripcion: $scope.pagoDatos.articulo,
				tipo: 'Compras'
			})					
		}


		/**
		 * [remover Elimina un registro seleccionado]
		 * @param  {[Array]} dato [El registro que debe ser eliminado]
		 */
		$scope.remover = function(dato) 
		{
			var indice = $scope.arrayCompras.$indexFor(dato.$id)//Se obtiene el indice del registro en la bd con un id determinado
			$scope.arrayCompras.$remove(indice)//Se elimina el registro ubicado en el indice indicado

		}


		function cargar_datos()
		{
			//Se muestran todas las compras que tienes hasta el momento
			var query = comprasRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid)
			$scope.misCompras = $firebaseArray(query)
		}

		cargar_datos()


		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.misCompras.$loaded()
			.then(function() {
				angular.forEach($scope.misCompras, function(compra) {
					$scope.totalCompras += compra.valor
				})
				$scope.noti.debe_declarar($scope.totalCompras, notify, "COMPRAS")
			})

	}
])
var rentgular = angular.module('rentgularApp')
rentgular.controller('serviciosPublicosCtrl', ['servicioAuth', 'servicioNoti', '$scope', '$route', '$firebaseArray',
	function(servicioAuth, servicioNoti, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.noti = servicioNoti
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		// -------------------------------------------------------------------------------------
		var serviciosRef = new Firebase('https://rentas.firebaseIO.com/egresos/servicios_publicos')
		$scope.arrayServicosPublicos = $firebaseArray(serviciosRef)
		$scope.pagoDatos = {}
		$scope.totalServicios = 0
		//Esta variable de scope guarda una funcion anonima,
		//esta es para Anadir datos de pago de servicios a la BD
		$scope.pago = function() {
			$scope.arrayServicosPublicos.$add({
				propietario: $scope.ref.$getAuth().uid,
				valor: $scope.pagoDatos.valor,
				descripcion: $scope.pagoDatos.concepto,
				tipo: 'Servicios publicos'
			})	
		}


		/**
		 * [remover Elimina un registro seleccionado]
		 * @param  {[Array]} dato [El registro que debe ser eliminado]
		 */
		$scope.remover = function(dato) 
		{
			var indice = $scope.arrayServicosPublicos.$indexFor(dato.$id)//Se obtiene el indice del registro en la bd con un id determinado
			$scope.arrayServicosPublicos.$remove(indice)//Se elimina el registro ubicado en el indice indicado

		}


		function cargar_datos()
		{
			//Se muestran los servicios publicos
			var query = serviciosRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid)
			$scope.misServicios = $firebaseArray(query)
		}

		cargar_datos()


		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.misServicios.$loaded()
			.then(function() {
				angular.forEach($scope.misServicios, function(servicioPublico) {
					$scope.totalServicios += servicioPublico.valor
				})
			})
	}
])
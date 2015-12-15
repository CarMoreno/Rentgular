var rentgular = angular.module('rentgularApp')
rentgular.controller('ingresosCtrl', ['servicioAuth', '$scope', '$route', '$firebaseArray', 
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		// ---------------------------------------------------------------------------
		var ingresosRef = new Firebase('https://rentas.firebaseIO.com/ingresos')
		var ingresos = {}
		$scope.miSalario = {}
		$scope.misCesantias = {}
		$scope.misPensiones ={}
		$scope.misVentas = {}
		$scope.misArriendos = {}
		$scope.arrayIngresos = $firebaseArray(ingresosRef)
		$scope.totalIngresos = 0


		$scope.pago = function(concepto) {
			if(concepto == 'salarios'){
				ingresos = $scope.miSalario
			}else if(concepto == 'cesantias'){
				ingresos = $scope.misCesantias
			}else if(concepto == 'pensiones'){
				ingresos = $scope.misPensiones
			}else if(concepto == 'ventas'){
				ingresos = $scope.misVentas
			}else{
				ingresos = $scope.misArriendos
			}
			//Llenamos el array de ingresos
			$scope.arrayIngresos.$add({
				id_usuario: $scope.ref.$getAuth().uid,
				descripcion: ingresos.descripcion,
				valor: ingresos.valor,
				por_concepto_de : concepto
			})
		}


		/**
		 * [remover Elimina un registro seleccionado]
		 * @param  {[Array]} dato [El registro que debe ser eliminado]
		 */
		$scope.remover = function(dato) 
		{
			var indice = $scope.arrayIngresos.$indexFor(dato.$id)//Se obtiene el indice del registro en la bd con un id determinado
			$scope.arrayIngresos.$remove(indice)//Se elimina el registro ubicado en el indice indicado

		}


		function cargar_datos () {
			//Se muestra todo el patrimonio que tienes hasta el momento
			var query = ingresosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid)
			$scope.misIngresos = $firebaseArray(query)
		}
		cargar_datos()


		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.misIngresos.$loaded()
			.then(function() {
				angular.forEach($scope.misIngresos, function(ingreso) {
					$scope.totalIngresos += ingreso.valor	
				})
			})
	}
])
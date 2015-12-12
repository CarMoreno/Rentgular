var rentgular = angular.module('rentgularApp')
rentgular.controller('ingresosCtrl', ['servicioAuth', '$scope', '$route', '$firebaseArray', 
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//$scope.cargarDatos = servicioAuth.cargar_datos()
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

		function cargar_datos () {
			// console.log($scope.arrayIngresos.$loaded())
			ingresosRef.orderByChild("id_usuario")
				.equalTo($scope.datosUserLog.uid).on("child_added", 
				function(snapshot) {
				//console.log("Estoy logueado con: "+$scope.datosUserLog.uid)
				//console.log("Ingresos del usuario actualmente logueado: "+$scope.arrayIngresos.$keyAt(snapshot.key()))				
				$scope.arrayIngresos.$loaded()
					.then(function() {
						angular.forEach($scope.arrayIngresos, function(ingreso) {
							if(ingreso.$id == snapshot.key()){
								console.log(ingreso)
							}
						})
					})
			})
		}
		console.log("Estoy logueado con "+$scope.datosUserLog.uid)
		cargar_datos()
		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.arrayIngresos.$loaded()
			.then(function() {
				angular.forEach($scope.arrayIngresos, function(ingreso) {
					$scope.totalIngresos += ingreso.valor
					console.log(ingreso)	
				})
			})
	}
])
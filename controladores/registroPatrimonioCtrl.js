var rentgular = angular.module('rentgularApp')

//3. Controlador que se encarga del registro de patrimonio de un usuario
rentgular.controller('registroPatrimonioCtrl', ['servicioAuth', '$scope', '$route', '$firebaseArray',
	function(servicioAuth, $scope, $route, $firebaseArray) {

		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//____________________________________________________________________________________

		var patrimonioRef = new Firebase('https://rentas.firebaseIO.com/patrimonio') //Se indica la direccion del nodo al que se desea acceder
		$scope.arrayPatrimonio = $firebaseArray(patrimonioRef)

		var patrimonioDatos = {}
		var fechaIngresoRegistro =  new Date()
		$scope.totalPatrimonio = 0
		$scope.miPatrimonio = {}
		$scope.misVehiculos = {}
		$scope.misMuebles = {}
		$scope.misCobros = {}
		$scope.miMaquinaria = {}
		$scope.misAhorros = {}
		$scope.misCooperativas = {}
		$scope.miCorriente = {}
		$scope.misAcciones = {}
		$scope.datos = {}
		//________________________ ______________________________________________________

		/**
		 * [registrarPatrimonio Permite almacenar la informacion referente al patrimonio en el nodo especificado]
		 * @param  {[String]} tipo [Indica el tipo de patrimonio que se desea registrar]
		 */
		$scope.registrarPatrimonio = function(tipo) {
			if(tipo == 'Vehiculos'){
				patrimonioDatos = $scope.misVehiculos
			}else if (tipo == 'Muebles') {
				patrimonioDatos = $scope.misMuebles
			}else if (tipo == 'Cobros') {
				patrimonioDatos = $scope.misCobros
			}else if (tipo == 'Maquinaria') {
				patrimonioDatos = $scope.miMaquinaria
			}else if(tipo == 'Cuenta ahorros'){
				patrimonioDatos = $scope.misAhorros
			}else if(tipo == 'Cuenta corriente'){
				patrimonioDatos = $scope.miCorriente
			}else if(tipo == 'Cuenta cooperativas'){
				patrimonioDatos = $scope.misCooperativas
			}else{
				patrimonioDatos = $scope.datos
			}

			//Se almacena la informacion en la URI especificada en la variable patrimonioRef
			$scope.arrayPatrimonio.$add({
				por_concepto_de : tipo,
				descripcion : patrimonioDatos.descripcion,
				valor : patrimonioDatos.valor,
				fecha_adquisicion : patrimonioDatos.fecha.toString(), //Se debe convertir el objeto Date devuelto por el campo a string para ser almacenado
				fecha_registro : fechaIngresoRegistro.toString(),
				id_usuario: $scope.datosUserLog.uid
			})
		}


		/**
		 * [cargarPatrimonio permite mostrar en pantalla el patrimonio de un usuario registrado]
		 */
		function cargarPatrimonio()
		{
			//Se muestra todo el patrimonio que tienes hasta el momento
			var query = patrimonioRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid)//Se busca en los nodos el atributo propietario que sea igual
																								 //a la identificacion del usuario logueado
			$scope.miPatrimonio = $firebaseArray(query)
		}

		cargarPatrimonio()


		/**
		 * [remover Elimina un registro seleccionado]
		 * @param  {[Array]} dato [El registro que debe ser eliminado]
		 */
		$scope.remover = function(dato) 
		{
			var indice = $scope.arrayPatrimonio.$indexFor(dato.$id)//Se obtiene el indice del registro en la bd con un id determinado
			$scope.arrayPatrimonio.$remove(indice)//Se elimina el registro ubicado en el indice indicado

		}


		// Esto nos permite que el array solo contenga los datos que hemos insertado y no
		// este lleno con datos del servidor, por defecto Firebase llena las referencias a
		// $firebaseArray con metodos y otras variables, con $loaded() solo tramemos los datos
		// que esten guardados en la base de datos NO MAS.
		$scope.miPatrimonio.$loaded()
			.then(function() {
				angular.forEach($scope.miPatrimonio, function(ingreso) {
					$scope.totalPatrimonio += ingreso.valor //Se obtiene el valor del patrimonio	
				})
			})
	}
])
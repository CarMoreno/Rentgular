var rentgular = angular.module('rentgularApp')
rentgular.controller('dashboardCtrl', ['servicioAuth', '$scope', '$route', '$firebaseArray',
	function(servicioAuth, $scope, $route, $firebaseArray) {
		// Las siguientes variables deben de ir en todos los controladores.
		$scope.auth = servicioAuth // Objeto que retorna el servicio
		$scope.ruta = $route // Ruta actual
		$scope.cambio = {}
		$scope.ref = servicioAuth.ref() // objeto $firebaseAuth
		$scope.datosUserLog = servicioAuth.ref().$getAuth() //datos del usuario logueado
		//---------------------------------------------------------------------------------------------------------------
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
		//--------------------------------------------------------------------------------------------------------------
		var descripcion = new Array()
		var tipo = new Array()
		var valor = new Array()
		var losIngresos

		var laCompras
		var descripcionCompras = new Array()
		var tipoCompras = new Array()
		var valorCompras = new Array()


		
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

		/**
		 * [graficarIngresos description]
		 * @return {[type]} [description]
		 */
		function graficarCausales(referencia, array, titulo, tituloX, nombreSerie, arrayDescripcion, arrayValor, arrayTipo){
			var query_graficas = referencia.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid)
			$scope.array = $firebaseArray(query_graficas)

			$scope.array.$loaded()
				.then(function() {
					angular.forEach($scope.array, function(registro) {
							arrayTipo.push(registro.por_concepto_de),
							arrayDescripcion.push(registro.descripcion+" - "+registro.por_concepto_de),
							arrayValor.push(registro.valor)
						})	
					console.log(eval(arrayValor.join('+')))
			//#################################################################################################
			    $('#chartdiv').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: titulo
			        },
			        xAxis: {
			            categories: arrayDescripcion,
			            title: {
			                text: tituloX
			            },
			            crosshair: true
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: null
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        },
			        series: [{
			            name: 'Costo($)',
			            data: arrayValor
			        },
			        {
			        	name: nombreSerie+" "+eval(arrayValor.join('+')),
			        	data: null
			        }]
			    });					
			})//cierra el loaded
			//################################################################################################
		}//cierra la funcion


		// Llamamos a las dos funciones que hemos declarado
		//get_ultimos_ingresos()
		//get_ultimos_egresos()
		graficarCausales(ingresosRef, losIngresos, 'Ingresos Brutos', 'Valor (COP)', 'Total Ingresos Brutos:', descripcion, tipo, valor)
		//graficarCausales(comprasRef, laCompras, 'Compras y Consumos', 'Valor (COP)', 'Total Compras:', descripcionCompras, tipoCompras, valorCompras)

		//##############################################################################################################################
		}
])
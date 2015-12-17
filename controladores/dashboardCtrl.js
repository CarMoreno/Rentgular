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

		function graficarIngresos(){
			var query_ingresos = ingresosRef.orderByChild("id_usuario").equalTo($scope.datosUserLog.uid)
			$scope.losIngresos = $firebaseArray(query_ingresos)

			$scope.losIngresos.$loaded()
				.then(function() {
					angular.forEach($scope.losIngresos, function(ingreso) {
							tipo.push(ingreso.por_concepto_de),
							descripcion.push(ingreso.descripcion),
							valor.push(ingreso.valor)
						})	
			//#################################################################################################
			$('#chartdiv').highcharts({
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: 'Ingresos Brutos'
			        },
			        subtitle: {
			            text: 'Movimientos'
			        },
			        xAxis: {
			            categories: descripcion,
			            title: {
			                text: null
			            }
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Valor (COP)',
			                align: 'high'
			            },
			            labels: {
			                overflow: 'justify'
			            }
			        },
			        tooltip: {
			            valueSuffix: ' millions'
			        },
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true
			                }
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            x: -40,
			            y: 80,
			            floating: true,
			            borderWidth: 1,
			            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			            shadow: true
			        },
			        credits: {
			            enabled: false
			        },
			        /**series: [{
			            name: 'Year 1800',
			            data: [107, 31, 635, 203, 2]
			        }, {
			            name: 'Year 1900',
			            data: [133, 156, 947, 408, 6]
			        }, {
			            name: 'Year 2012',
			            data: [1052, 954, 4250, 740, 38]
			        }]**/
			        series:[{name: tipo,
			        		data: valor}]
			    });
						
			})//cierra el loaded
			//################################################################################################
		}//cierra la funcion


		// Llamamos a las dos funciones que hemos declarado
		//get_ultimos_ingresos()
		//get_ultimos_egresos()
		graficarIngresos()


		//##############################################################################################################################
		}
])
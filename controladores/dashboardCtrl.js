//4. Dashboard

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
		//Referencias para los egresos, es necesari0, puesto que los tengo en nodos independientes
		var comprasRef = new Firebase('http://rentas.firebaseIO.com/egresos/compras')
		var pagosSalariosRef = new Firebase('http://rentas.firebaseIO.com/egresos/pagos_salarios')
		var serviciosPublicosRef = new Firebase('http://rentas.firebaseIO.com/egresos/servicios_publicos')
		var patrimonioRef = new Firebase('http://rentas.firebaseIO.com/patrimonio')
		//Declaro los arrays para cada movimiento (ingresos o egresos: compras, pagos de salarios, servicios publicos)
		$scope.arrayUltimasCompras = $firebaseArray(comprasRef)
		$scope.arrayUltimosPagos = $firebaseArray(pagosSalariosRef)
		$scope.arrayUltimosPagosServicios = $firebaseArray(serviciosPublicosRef)
		$scope.arrayUltimosIngresos = $firebaseArray(ingresosRef)
		$scope.arrayUltimosPatrimonios = $firebaseArray(patrimonioRef)

		//Arrays para las graficas
		var descripcion = new Array()
		var tipo = new Array()
		var valor = new Array()
		$scope.losIngresos

		$scope.lasCompras 
		var descripcionCompras = new Array()
		var tipoCompras = new Array()
		var valorCompras = new Array()

		$scope.elPatrimonio
		var patrimonioDescripcion = new Array()
		var patrimonioTipo = new Array()
		var patrimonioValor = new Array()

		var transaccionDescripcion = new Array()
		var transaccionTipo = new Array()
		var transaccionValor = new Array()

		//Setea el array de ingresos con los ultimos dos ingresos del usuario logueado
		// actualemnte.
		function get_ultimos_ingresos() {
			var query = ingresosRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid).limitToLast(2)
			$scope.arrayUltimosIngresos = $firebaseArray(query)
			
		}

		// Setea tres arrays, los correspondientes a los egresos:
		// - Array de compras
		// - Array de servicios publicos
		// -Array de pago de salarios
		function get_ultimos_egresos() {
			//Realizamos las consultas
			var query_compras = comprasRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid).limitToLast(1)
			var query_pago_salarios = pagosSalariosRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid).limitToLast(1)
			var query_servicios_publicos = serviciosPublicosRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid).limitToLast(1)

			$scope.arrayUltimasCompras = $firebaseArray(query_compras)
			$scope.arrayUltimosPagos = $firebaseArray(query_pago_salarios)
			$scope.arrayUltimosPagosServicios = $firebaseArray(query_servicios_publicos)
			//console.log($scope.arrayUltimosPagosServicios)
		}


		function get_ultimos_patrimonios () {
			var query = patrimonioRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid).limitToLast(2)
			$scope.arrayUltimosPatrimonios = $firebaseArray(query)	
		}

		/**
		 * [graficarIngresosCompras Grafica los datos importantes de las causales ingresos y compras]
		 */
		function graficarIngresosCompras(referencia, array, titulo, tituloX, tituloY, nombreSerie, arrayDescripcion, arrayValor, arrayTipo, div){
			var query_graficas = referencia.orderByChild("propietario").equalTo($scope.datosUserLog.uid)
			array = $firebaseArray(query_graficas)

			array.$loaded()//Una vez se ha cargado el array con los resultados de la consulta, se llenan los arreglos para las graficas
				.then(function() {
					angular.forEach(array, function(registro) {
							arrayTipo.push(registro.tipo),
							arrayDescripcion.push(registro.descripcion+" - "+registro.tipo),
							arrayValor.push(registro.valor)
						})
			//#################################################################################################
			    $(div).highcharts({//API usada para las graficas
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
			                text: tituloY
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
			            name: 'Valor($)',
			            data: arrayValor//Valores a graficar
			        },
			        {
			        	name: nombreSerie+" "+eval(arrayValor.join('+')),
			        	data: null
			        }]
			    });					
			})//cierra el loaded
			//################################################################################################
		}//cierra la funcion


		/**
		 * [graficarPatrimonioTransacciones Permite plasmar en una grafica los datos del patrimonio y las transacciones]
		 */
		function graficarPatrimonioTransacciones(){
			var query_graficas = patrimonioRef.orderByChild("propietario").equalTo($scope.datosUserLog.uid)
			$scope.elPatrimonio = $firebaseArray(query_graficas)

			$scope.elPatrimonio.$loaded()
				.then(function() {
					angular.forEach($scope.elPatrimonio, function(registro) {

						if(registro.tipo == "Cuenta ahorros" || registro.tipo == "Cuenta corriente" || registro.tipo == "Cuenta cooperativas")
						{
							//Se llenan los arreglos corresponientes a transacciones
							transaccionTipo.push(registro.tipo),
							transaccionDescripcion.push(registro.descripcion+" - "+registro.tipo),
							transaccionValor.push(registro.valor)

						}
						else{
							patrimonioTipo.push(registro.tipo),
							patrimonioDescripcion.push(registro.descripcion+" - "+registro.tipo),
							patrimonioValor.push(registro.valor)
						}
					})
			//#################################################################################################
			    $('#patrimonio').highcharts({
			        chart: {
			            type: 'column'
			        },
			        title: {
			            text: 'Patrimonio Bruto y Transacciones'
			        },
			        xAxis: {
			            categories: patrimonioDescripcion.concat(transaccionDescripcion),
			            title: {
			                text: 'Descripcion'
			            },
			            crosshair: true
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: 'Valor (COP)'
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y}</b></td></tr>',
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
			            name: 'Valor Patrimonio($)',
			            data:  patrimonioValor
			        },
			        {
			        	name: 'Total Patrimonio Bruto: '+" "+eval(patrimonioValor.join('+')),
			        	data: null
			        },
			        {
			        	name: 'Valor Transaccion($)',
			        	data: transaccionValor
			        },
			        {
			        	name: 'Total Transacciones: '+" "+eval(transaccionValor.join('+'))
			        }
			        ]
			    });
	
			})//cierra el loaded
			//################################################################################################
		}//cierra la funcion


		/**
		 * [graficarTopes Grafica de los topes por cada causal]
		 * @param  div  [area para la grafica]
		 * @param  {[Array]} movs [array de movimientos]
		 */
		function graficarTopes(div, movs)
		{
			$(div).highcharts({
		        title: {
		            text: 'Topes',
		            x: -20 //center
		        },
		        xAxis: {
		            categories: ['Ingresos', 'Compras', 'Patrimonio', 'Transacciones']
		        },
		        yAxis: {
		            title: {
		                text: 'Cantidad'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: null
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: 'Tope',
		            data: [37577000, 75155000, 120785000, 120785000]
		        }, {
		            name: 'Movimientos',
		            data: movs
		        }]
		    });

		}

		// Llamamos a las funciones
		get_ultimos_ingresos()
		get_ultimos_egresos()
		get_ultimos_patrimonios()
		graficarIngresosCompras(ingresosRef, $scope.losIngresos, 'Ingresos Brutos', 'Descripcion', 'Valor (COP)', 'Total Ingresos Brutos:', descripcion, tipo, valor, '#ingresos')
		graficarIngresosCompras(comprasRef, $scope.lasCompras, 'Compras y Consumos', 'Descripcion', 'Valor (COP)', 'Total Compras:', descripcionCompras, tipoCompras, valorCompras, '#compras')
		graficarPatrimonioTransacciones()
		graficarTopes('#topes', [2,4,5,6])
	}
])
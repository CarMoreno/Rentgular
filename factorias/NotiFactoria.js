
/**  ==========================Condiciones para declarar Renta=========================
	● Ingresos brutos mayor a $37’577.000
	● Patrimonio bruto mayor a $120’785.000 pesos.
	● Compras y consumos, sin importar el medio de pago y con tarjeta de crédito, superiores
	a $75’155.000 pesos.
	● Consignaciones bancarias, depósitos e inversiones financieras que superen los
	$120’785.000 pesos.
**/
var rentgular = angular.module('rentgularApp')
rentgular.factory('servicioNoti', [
	function() {
		//Topes que se deben de superar para declarar renta
		var TOPE_INGRESOS = 37577000 
		var TOPE_COMPRAS = 75155000
		var TOPE_PATRIMONIO = 120785000
		var TOPE_TRANSACCIONES = 75155000
		// monto a pagar si los topes son excedidos
		var monto_pagar = 0
		var obj = {
			/**
			 * [debe_declarar Esta funcion notifica al usario el monto a pagar dependiendo de unos
			 * montos establecidos, hace uso del servicio notify para realizar las notificaciones]
			 * @param  {[int]} total  [el total en cualquiera de sus variaciones: de ingresos, de compras, de transacciones y de patrimonio]
			 * @param  {[service]} notify [un servicio externo para la gestión de notificaciones]
			 * @param  {[string]} motivo [el motivo de causal]
			 * @return {[void]}        [void]
			 */
			debe_declarar:	function(total, notify, motivo) {
					if(motivo == "INGRESOS") {
						if(total > TOPE_INGRESOS){
							monto_pagar = total * 0.45	 
							notify({message:'Has excedido el monto de tus ingresos, debes declarar renta por valor de $'+monto_pagar,
									duration:'15000'
							})
						}	
					}else if(motivo == "COMPRAS"){
						if(total > TOPE_COMPRAS){
							monto_pagar = total * 0.25
							notify({message:'Has excedido el monto de tus compras, debes declarar renta por valor de'+monto_pagar,
									duration:'15000'
							})
						}
					}else if(motivo == "PATRIMONIO"){
						console.log(TOPE_PATRIMONIO)
						if(total > TOPE_PATRIMONIO){
							monto_pagar = total * 0.65
							notify({message:'Has excedido el monto del patrimonio, debes declarar renta por valor de'+monto_pagar,
									duration:'15000'
							})
							
						}
					}else if(motivo == "TRANSACCIONES"){
						if(total > TOPE_TRANSACCIONES){
							monto_pagar = total * 0.3
							notify({message:'Has excedido el monto de transacciones, debes declarar renta por valor de'+monto_pagar,
									duration:'15000'
							})	
						}
					}
				}//fin debe_declarar
		}//fin obj
		return obj
}])
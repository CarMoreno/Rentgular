
/**  ==========================Condiciones para declarar Renta=========================
1. Las personas naturales con ingresos superiores a $3265000 mensuales en 2014 deben declarar
renta en 2015.
2. Si tuviste patrimonio bruto de más de $123,68 millones de pesos en 2014 debes declarar renta.
3. Si tuviste ingresos brutos anuales por más de $38,48 millones en el años 2014,  
   presentas declaración.
4. Si registraste consumos con tarjeta débito o crédito por más de $76,9 millones o consignaciones
   bancarias por más de $123,68 millones, en 2014 también declaras este año.

Cualquiera de las cuatros condiciones anteriores es suficiente para presentar la declaración.
**/
var rentgular = angular.module('rentgularApp')
rentgular.factory('servicioNoti', [
	function() {
		//Topes que se deben de superar para declarar renta
		var TOPE_INGRESOS = 38479000 
		var TOPE_COMPRAS = 76958000
		var TOPE_PATRIMONIO = 123682500
		var TOPE_TRANSACCIONES = 76958000
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
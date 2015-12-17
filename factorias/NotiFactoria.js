
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
		var TOPE_INGRESOS = 38479000 //Ingresos que se deben superar para que declare renta
		var TOPE_COMPRAS = 76958000
		var TOPE_PATRIMONIO = 123682500
		var TOPE_TRANSACCIONES = 76958000
		var obj = {
			debe_declarar:	function(total, notify, motivo) {
					if(motivo == "INGRESOS") {
						console.log("Hola")
						if(total > TOPE_INGRESOS){
							notify({message:'Debes declarar renta, has excedido el monto de tus ingresos',
									duration:'10000'

							})
						}	
					}else if(motivo == "COMPRAS"){
						if(total > TOPE_COMPRAS){
							notify({message:'Debes declarar renta, has excedido el monto de tus compras',
									duration:'10000'
							})
						}
					}else if(motivo == "PATRIMONIO"){
						console.log(TOPE_PATRIMONIO)
						if(total > TOPE_PATRIMONIO){
							console.log('ENTRE AL SEG IF')
							notify({message:'Debes declarar renta, has excedido el monto del patrimonio',
									duration:'10000'
							})
							
						}
					}else if(motivo == "TRANSACCIONES"){
						if(total > TOPE_TRANSACCIONES){
							notify({message:'Debes declarar renta, has excedido el monto de transacciones',
									duration:'10000'
							})	
						}
					}
				}
		}
		return obj
}])
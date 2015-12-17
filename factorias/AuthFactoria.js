// Esta factoria retorna un objeto autenticacion de firebase.
// Es necesario crearla pues necesito tener siempre el mismo 
// objeto de autenticacion en cualquier vista. Con un controlador
// tengo el objeto autenticacion solo en la vista que maneje determinado
// controloador. Esta factoria será usado por los controladores de loguin y registro
var rentgular = angular.module('rentgularApp')
rentgular.factory('servicioAuth', ['$firebaseAuth',
	function($firebaseAuth) {
		var ref = new Firebase("https://rentas.firebaseIO.com")
		var authObj = $firebaseAuth(ref)

		function ucfirst (str) {
      	// inspirado en: http://kevin.vanzonneveld.net
	      str += '';
	      var f = str.charAt(0).toUpperCase();
	      return f + str.substr(1);
	    }

		var obj = {
			ref : function() {
				return authObj
			},
			change_password: function(e, firebaseRef, tuemail, passVieja, passNueva) {
				e.preventDefault()//Para que la pagina no recargue cuando ejecutemos la accion
				//console.log('Hola')
				var mensaje = null
				firebaseRef.$changePassword({
					email: tuemail,
					oldPassword: passVieja,
					newPassword: passNueva
				}).then(function() {
					document.getElementById('exitoCambio').innerHTML = 'Exito, ha cambiado su contraseña'
					//return mensaje
				}).catch(function(error) {
					document.getElementById('exitoCambio').innerHTML = ''
					document.getElementById('errorCambio').innerHTML = 'Error, vuelva a intentarlo'
				})
			},
			name_user: function(email_user) {
				return ucfirst(email_user.substr(0, email_user.indexOf('@')) || '')
			}
		}
		return obj
	}
]);
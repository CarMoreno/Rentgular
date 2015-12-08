// 1. Controlador del Login, se encarga de gestionar el login con Password e email,
// asi como el login federado y el logout

var rentgular = angular.module('rentgularApp')
rentgular.controller('loginCtrl', ['servicioAuth', '$scope', '$firebaseAuth','$location', 
	function(servicioAuth, $scope, $firebaseAuth, $location) {
		$scope.user = {}//En un objeto lo que venga de los input en las vistas
		$scope.mensaje = ''
		$scope.emailOlvido = ''
		//Funcion para logear Usuarios
		$scope.login = function(e) {
			e.preventDefault()//Para que la pagina no recargue cuando ejecutemos la accion
			var username = $scope.user.email
			var password = $scope.user.password
			servicioAuth.$authWithPassword({
				email : username,
				password : password
			}).then(function(datos_autenticacion) {
				//console.log("EXITO en el logueo",datos_autenticacion)
				$location.path("/dashboard")//Redirige al dashboard
			}).catch(function(error) {
				//console.log("ERROR en el logueo", error)
				getError(error)
			});

		}

		//funcion para autenticacion federada
		$scope.auth_federada = function(red_social) {
					
			servicioAuth.$authWithOAuthPopup(red_social)
				.then(function(datos_autenticacion) {
					console.log("EXITO AL AUTENTICAR CON "+red_social+"",datos_autenticacion)
				})
				.catch(function(error) {
					console.log("ERROR AL AUTENTICAR CON "+red_social+"",error)
				})
			
		}

		// Funcion para recuperar contraseña
		$scope.recuperarPassword = function() {
			servicioAuth.$resetPassword({
				email : $scope.emailOlvido
			}).then(
				$scope.mensaje = "Revisa tu correo electrónico, te hemos enviado un enlace de recuperación"
			).catch(function(error) {
			  	$scope.mensaje = "Error, el correo no existe"
			});	
		}
		
		//Funcion que configura los mensajes de error
		function getError(error) {
			if(error){
				if(error.code == 'INVALID_USER'){
					$scope.mensaje = 'Este usuario no existe'
				}else if(error.code == 'INVALID_PASSWORD'){
					$scope.mensaje = 'Contraseña incorrecta'
				}else{
					$scope.mensaje = error
				}
			}else{
				$scope.mensaje = 'Éxito, espere un momento'
			}	
		}
}]);

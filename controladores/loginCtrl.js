// 1. Controlador del Login, se encarga de gestionar el login con Password e email,
// asi como el login federado y el logout

var rentgular = angular.module('rentgularApp')
rentgular.controller('loginCtrl', ['servicioAuth', '$scope', '$firebaseAuth','$location', 
	function(servicioAuth, $scope, $firebaseAuth, $location) {
		$scope.user = {}//En un objeto lo que venga de los input en las vistas
		//Funcion para logear Usuarios
		$scope.login = function(e) {
			e.preventDefault()//Para que la pagina no recargue cuando ejecutemos la accion
			var username = $scope.user.email
			var password = $scope.user.password
			servicioAuth.$authWithPassword({
				email : username,
				password : password
			}).then(function(datos_autenticacion) {
				console.log("EXITO en el logueo",datos_autenticacion)
				$location.path("/dashboard")//Redirige al dashboard
			}).catch(function(error) {
				console.log("ERROR en el logueo", error)
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
}]);

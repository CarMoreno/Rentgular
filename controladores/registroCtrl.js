//2. Controlador de registro de usuarios
//
var rentgular = angular.module('rentgularApp')
rentgular.controller('registroCtrl',['servicioAuth', '$scope', '$firebaseAuth',
	function(servicioAuth, $scope, $firebaseAuth) {
		$scope.user_register = {}
		$scope.mensaje = ''
		console.log("password = "+$scope.user_register.password +" -- "+"password2 = "+$scope.user_register.password2)
		//Funcion para crear un usuario
		$scope.crearUsuario = function(e) {
			e.preventDefault() // Para que a pagina no se refresque cuando estemos en la gestion de registar un nuevo usuario, pueden generarse errores. 
			servicioAuth.$createUser({
				email: $scope.user_register.email,
				password: $scope.user_register.password
			}).then(function(data_users) {
				$scope.mensaje = 'Exito, te has registrado satisfactoriamente'
			}).catch(function(error) {
				getError(error)
				
			});
		};
		
		function getError(error) {
			if(error.code == 'EMAIL_TAKEN'){
				$scope.mensaje = 'El email ya está registrado'
			}else{
				$scope.mensaje = error
			}
			console.log($scope.mensaje)
		}
}]);
//2. Controlador de registro de usuarios
//
var rentgular = angular.module('rentgularApp')
rentgular.controller('registroCtrl',['servicioAuth', '$scope', '$firebaseAuth',
	function(servicioAuth, $scope, $firebaseAuth) {
		$scope.user_register = {}
		console.log("password = "+$scope.user_register.password +" -- "+"password2 = "+$scope.user_register.password2)
		$scope.crearUsuario = function(e) {
			e.preventDefault() // Para que a pagina no se refresque cuando estemos en la gestion de registar un nuevo usuario, pueden generarse errores. 
			servicioAuth.$createUser({
				email: $scope.user_register.email,
				password: $scope.user_register.password
			}).then(function(data_users) {
				console.log("EXITO, Usuario Creado con uid ",data_users.uid)
			}).catch(function(error) {
				console.log("ERROR al crear usuario :(",error)
			});
		};
}]);
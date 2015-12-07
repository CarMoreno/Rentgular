// Esta factoria retorna un objeto autenticacion de firebase.
// Es necesario crearla pues necesito tener siempre el mismo 
// objeto de autenticacion en cualquier vista. Con un controlador
// tengo el objeto autenticacion solo en la vista que maneje determinado
// controloador. Esta factoria será usado por los controladores de loguin y registro
var rentgular = angular.module('rentgularApp')
rentgular.factory('servicioAuth', ['$firebaseAuth',
	function($firebaseAuth) {
    	var ref = new Firebase("https://rentas.firebaseIO.com")
    	return $firebaseAuth(ref)
  	}
]);
var app= angular.module("forms",[]);


app.controller("formController",function ($scope){



 $scope.ahorro = true;
 $scope.corriente = true;
 $scope.coop = true;
 $scope.otros = true;

        $scope.ShowForm = function(opcion) {
        
        switch (opcion)
         {

        	case "ahorros":

        	    if ($scope.ahorro==true)
        	    {
                  
        	 	 $scope.ahorro=false;
        	
        	    }
        	    else {$scope.ahorro=true;}

        	    break;

        	 	case "corriente":

 				if ($scope.corriente==true)
 				{
        	 		$scope.corriente=false;
        	 	}
        			
        			else {$scope.corriente=true;}
 					break;	

 			case "coop":

        	    if ($scope.coop==true)
        	    {
        	 	 $scope.coop=false;
        	 	
        	    }
        	    else {$scope.coop=true;}

        	    break;
        	    		
        	case "otros":

        	    if ($scope.otros==true)
        	    {
        	 	 $scope.otros=false;
        	 	
        	    }
        	    else {$scope.otros=true;}

        	    break;

        }        	
} 






var id=0;
$scope.datos = [];
$scope.total=0;
$scope.valorGen = 0;


 $scope.agregar = function(cuenta)
  {    

        switch (cuenta)

        {

          case "ahorro":
      
                    id++;
              
                    // Agregamos los Datos
                    $scope.datos.push({contador:id,cuenta:"Cta Ahorros",descripcion: $scope.descripcion,valor:$scope.valor})
                   

                    //tomamos valor de dato agregado
                    var ultElemento = $scope.datos[$scope.datos.length - 1];  //
                    $scope.valorGen = parseInt(ultElemento.valor);
                
                        // Limpiamos los Input
                        $scope.descripcion = '';
                        $scope.valor = '';
                        $scope.ahorro=true;   
                        $scope.formBien.$dirty=false;
                        document.getElementById("chkAh").checked = false;
                        break;

             case "corriente":

                        id++;
                        // Agregamos los Datos
                        $scope.datos.push({contador:id,cuenta:"Cta Corriente",descripcion: $scope.descripcion1,valor:$scope.valor1})
                              
                        //tomamos valor de dato agregado
                        var ultElemento = $scope.datos[$scope.datos.length - 1];  //
                        $scope.valorGen = parseInt(ultElemento.valor);
                    
                        // Limpiamos los Input
                        $scope.descripcion1 = '';
                        $scope.valor1 = '';
                        $scope.corriente=true; 
                        $scope.formBien.$dirty=false;   
                        document.getElementById("chkCor").checked = false;
                        break;



             case "coop":

             
                        id++;
                        // Agregamos los Datos
                        $scope.datos.push({contador:id,cuenta:"Cooperativas",descripcion: $scope.descripcion2,valor:$scope.valor2})
                              
                        //tomamos valor de dato agregado
                        var ultElemento = $scope.datos[$scope.datos.length - 1];  //
                        $scope.valorGen = parseInt(ultElemento.valor);
                    
                        // Limpiamos los Input
                        $scope.descripcion2 = '';
                        $scope.valor2 = '';
                        $scope.coop=true;
                        $scope.formBien.$dirty=false;    
                        document.getElementById("chkcoop").checked = false;
                  


                        break;



            case "otros":

                        id++;
                        // Agregamos los Datos
                        $scope.datos.push({contador:id,cuenta:"Otros",descripcion: $scope.descripcion3,valor:$scope.valor3})
                              
                        //tomamos valor de dato agregado
                        var ultElemento = $scope.datos[$scope.datos.length - 1];  //
                        $scope.valorGen = parseInt(ultElemento.valor);
                
                    
                        // Limpiamos los Input
                        $scope.descripcion3 = '';
                        $scope.valor3 = '';
                        $scope.otros=true;   
                        $scope.formBien.$dirty=false; 
                        document.getElementById("chkotro").checked = false;
                        break;                                   
        }



        $scope.total += $scope.valorGen;
        console.log($scope.total);

}   
    

     $scope.remove=function(item){ 
      var index=$scope.datos.indexOf(item)
      $scope.datos.splice(index,1);  
     $scope.total -= item.valor;    
    }    





});




app.controller("bienesController",function ($scope)
{  
console.log("hola ") 
$scope.ahorro=0;

    $scope.agregarMenu = function(dato)
    {

        switch (dato)

        {

              case "ahorro":
                if ($scope.ahorro==0){
                $scope.ahorro=1;

                }

                else {$scope.ahorro=0;}
      
          break;
        
        }


    }




});
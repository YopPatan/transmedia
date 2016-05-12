transmedia.directive('setvalue', function($parse, $timeout) {

    return {
        restrict: 'E',
        require: '^ngController',
        link: function (scope, element, attrs, ngCtrl) {
            ngCtrl.setScope(attrs.element, attrs.value);

            /*
            // creo funcion en base a un model
            var modelGetter = $parse('max_depth');
            
            // creo seter del mismo model
            var modelSetter = modelGetter.assign;

            // seteo valor del modelo
            // necesito pasar el scope que se utilizara, el cual es que usa el controlador
            // scope es el del elemento, primer padre es la tarjeta, segundo padre es el scope. 
            modelSetter(scope.$parent.$parent.$parent, 5);
            */
            
        }
    }
    
});


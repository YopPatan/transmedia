transmedia.controller('mainCtrl', function ($scope, $http, $window) {

    $scope.current_x = 0;
    $scope.current_y = 0;
    $scope.event;
    $scope.cards;
    
    $http.get('js/data.json')
    .success(function(data, status, headers, config) {
        //console.log(data);
        $scope.cards = data;
    })
    .error(function(data, status, headers, config) {
        
    });
    
    $scope.changePosition = function(offset_x, offset_y) {
        if (offset_x == 0) {
            $scope.event = (offset_y > 0) ? 'down' : 'up';
        }
        else {
            $scope.event = (offset_x > 0) ? 'right' : 'left';
        }
        //$scope.event = offset_x + ", " + offset_y;
        $scope.current_x =$scope.current_x + offset_x;
        $scope.current_y =$scope.current_y + offset_y;
    }
    
    // cambio en la pantalla
    $scope.$watch(function() {
       console.log("watch");
       $scope.backgroundResize();
    });
    
    // cambio en el tamaño de la ventana
    angular.element($window).bind('resize', function() {
        console.log('bind resize');
        $scope.backgroundResize();
    })
    
    $scope.backgroundResize = function() {
        var path = angular.element('.background:visible');
        
        // tamaño del contenedor
        var contW = parseInt(path.css('width'), 10);
        var contH = parseInt(path.css('height'), 10);
        
        // tamaño real de la imagen
        var imgW = path.attr('data-img-width');
        var imgH = path.attr('data-img-height');
        
        // ratio de la imagen real
        var ratio = imgW / imgH;

        imgH = contH;  // alto imagen igual a alto contenedor
        imgW = imgH * ratio;  // ancho imagen segun ratio
        
        // si deja bordes blancos en el contenedor
        if (contW > imgW){
            imgW = contW;  // ancho imagen igual a ancho contenedor
            imgH = imgW / ratio;  // alto imagen segun ratio
        }
        
        angular.forEach(angular.element('.background'), function(value, key) {
            var other = angular.element(value);
            other.css('background-size', imgW + 'px ' + imgH + 'px');
        });
    }

});
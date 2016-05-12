transmedia.controller('mainCtrl', function ($scope, $http, $window) {

    $scope.current_x = 0;
    $scope.current_y = 0;
    $scope.current_depth = 0;
    $scope.max_depth = 10;
    $scope.event;
    $scope.cards;
    $scope.map;
    
    $http.get('js/data.json')
    .success(function(data, status, headers, config) {
        //console.log(data);
        $scope.cards = data;
        $scope.map = {
            'min_x' :  Math.min.apply(Math, data.map(function(item) { return item.pos_x; })),
            'max_x' :  Math.max.apply(Math, data.map(function(item) { return item.pos_x; })),
            'min_y' :  Math.min.apply(Math, data.map(function(item) { return item.pos_y; })),
            'max_y' :  Math.max.apply(Math, data.map(function(item) { return item.pos_y; }))
        }
        
    })
    .error(function(data, status, headers, config) {
        
    });
    
    $scope.changePosition = function(offset_x, offset_y) {
        if (($scope.current_x + offset_x) < $scope.map.min_x || ($scope.current_x + offset_x) > $scope.map.max_x) {
            return;
        }
        if (($scope.current_y + offset_y) < $scope.map.min_y || ($scope.current_y + offset_y) > $scope.map.max_y) {
            return;
        }
        
        if (offset_x == 0) {
            $scope.event = (offset_y > 0) ? 'down' : 'up';
        }
        else {
            $scope.event = (offset_x > 0) ? 'right' : 'left';
        }
        //$scope.event = offset_x + ", " + offset_y;
        $scope.current_depth = 0;
        $scope.current_x = $scope.current_x + offset_x;
        $scope.current_y = $scope.current_y + offset_y;
        //console.log($scope.current_x + " " + $scope.current_y);
    }

    $scope.changePositionById = function(pos_x, pos_y) {
        $scope.event = 'jump';
        $scope.current_x = pos_x;
        $scope.current_y = pos_y;
        $scope.current_depth = 0;
    }
    
    $scope.changeDepth = function(offset_depth) {
        $scope.current_depth = $scope.current_depth + offset_depth;
    }
    
    // cambio en la pantalla
    $scope.$watch(function() {
       //console.log("watch");
       $scope.backgroundResize();
    });
    
    // cambio en el tamaño de la ventana
    angular.element($window).bind('resize', function() {
        //console.log('bind resize');
        $scope.backgroundResize();
    });
    
    angular.element($window).bind("keydown", function (event) {
        $scope.$apply(function () {
            if (event.keyCode == 40 && $scope.current_y<$scope.map.max_y) {
                $scope.changePosition(0, 1);
            }
            if (event.keyCode == 38 && $scope.current_y>$scope.map.min_y) {
                $scope.changePosition(0, -1);
            }
            if (event.keyCode == 39 && $scope.current_x<$scope.map.max_x) {
                $scope.changePosition(1, 0);
            }
            if (event.keyCode == 37 && $scope.current_x>$scope.map.min_x) {
                $scope.changePosition(-1, 0);
            }
            if (event.keyCode == 107 && $scope.current_depth < $scope.max_depth) {
                $scope.changeDepth(1);
            }
            if (event.keyCode == 109 && $scope.current_depth > 0) {
                $scope.changeDepth(-1);
            }
        });
    });
    
    $scope.backgroundResize = function() {
        var path = angular.element('.background-img:visible');
        
        // tamaño del contenedor
        var contW = parseInt(path.css('width'), 10);
        var contH = parseInt(path.css('height'), 10);
        
        // tamaño real de la imagen
        //var imgW = path.attr('data-img-width');
        //var imgH = path.attr('data-img-height');
        var imgW = 1600;
        var imgH = 1064;
        
        // ratio de la imagen real
        var ratio = imgW / imgH;

        imgH = contH;  // alto imagen igual a alto contenedor
        imgW = imgH * ratio;  // ancho imagen segun ratio
        
        // si deja bordes blancos en el contenedor
        if (contW > imgW){
            imgW = contW;  // ancho imagen igual a ancho contenedor
            imgH = imgW / ratio;  // alto imagen segun ratio
        }
        
        angular.forEach(angular.element('.background-img'), function(value, key) {
            var other = angular.element(value);
            other.css('background-size', imgW + 'px ' + imgH + 'px');
        });
    }
    
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
    
    $scope.swipe = function() {
        console.log("test");
        $scope.changePosition(0, 1);
    }
    
    this.setScope = function(element, value) {
        $scope[element] = value;
        //$scope['max_depth'] = 8;
        //console.log($scope['max_depth']);
    }

});



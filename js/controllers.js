transmedia.controller('mainCtrl', function ($scope, $http, $window, $routeParams) {
    
    $scope.current_x = ((isNaN($routeParams.pos_x) || $routeParams.pos_x === "") ? 0 : parseInt($routeParams.pos_x));
    $scope.current_y = ((isNaN($routeParams.pos_y) || $routeParams.pos_y === "") ? 0 : parseInt($routeParams.pos_y));
    $scope.current_depth = 0;
    $scope.max_depth = 10;
    $scope.event;
    $scope.cards;
    $scope.map;
    
    $http.get('js/data.json')
    .success(function(data, status, headers, config) {
        //console.log(data);
        $scope.cards = data.cards;
        $scope.map = {
            'min_x' :  Math.min.apply(Math, $scope.cards.map(function(item) { return item.pos_x; })),
            'max_x' :  Math.max.apply(Math, $scope.cards.map(function(item) { return item.pos_x; })),
            'min_y' :  Math.min.apply(Math, $scope.cards.map(function(item) { return item.pos_y; })),
            'max_y' :  Math.max.apply(Math, $scope.cards.map(function(item) { return item.pos_y; }))
        }
        
        if ($scope.current_x > $scope.map.max_x || $scope.current_x < $scope.map.min_x) {
            $scope.current_x = 0;
        }
        if ($scope.current_y > $scope.map.max_y || $scope.current_y < $scope.map.min_y) {
            $scope.current_y = 0;
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
        $scope.current_depth = 0;
        $scope.current_x = $scope.current_x + offset_x;
        $scope.current_y = $scope.current_y + offset_y;
    }

    $scope.changePositionById = function(pos_x, pos_y) {
        $scope.event = 'jump';
        $scope.current_x = pos_x;
        $scope.current_y = pos_y;
        $scope.current_depth = 0;
        //$scope.changeCurrentCard();
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
        console.log(event.keyCode);
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
            if ((event.keyCode == 107 || event.keyCode == 187) && $scope.current_depth < $scope.max_depth) {
                $scope.changeDepth(1);
            }
            if ((event.keyCode == 109 || event.keyCode == 189) && $scope.current_depth > 0) {
                $scope.changeDepth(-1);
            }
            if (event.keyCode == 27) {
                $scope.show_section = false;
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
        
        var row_tpl = angular.element('.row-tpl:visible');
//        console.log(row_tpl.css('width'));
        
        
        angular.forEach(angular.element('.col-tpl:visible'), function(value, key) {
            var col_tpl = angular.element(value);
//            other.css('background-size', imgW + 'px ' + imgH + 'px');
            //console.log(key);
            //console.log(col_tpl.css('width'));
            if (col_tpl.css('width') === row_tpl.css('width')) {
//                console.log("100%");
                col_tpl.css('height', '50%');
            }
            else {
//                console.log("50%");
                col_tpl.css('height', '100%');
            }
        });
        
//        console.log("resize");
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
    
    $scope.getProgress = function() {
        if ($scope.max_depth == null || $scope.max_depth == 0) {
            return 0;
        }
        else {
            return ((parseInt($scope.current_depth) + 0) * 100) / (parseInt($scope.max_depth) + 0);
        }
    }
    
    this.setScope = function(element, value) {
        $scope[element] = value;
    }

});

transmedia.controller('menuCtrl', function($scope, $http) {
    
    $scope.sections;
    $scope.cards;
    $scope.show_section = 0;
    
    $http.get('js/data.json')
    .success(function(data, status, headers, config) {
        //console.log(data);
        $scope.sections = data.sections;
        //$scope.cards = data.cards;
        $scope.subcards = new Array();
        angular.forEach(data.cards, function(cardv, cardk) {
            angular.forEach(cardv.subcards, function(subcardv, subcardk) {
                if ($scope.subcards[subcardv.section_id] === undefined) {
                    $scope.subcards[subcardv.section_id] = new Array();
                }
                $scope.subcards[subcardv.section_id].push(subcardv);
            });
        });
        //console.log($scope.subcards);
    })
    .error(function(data, status, headers, config) {
        
    });
    
    $scope.changeSection = function(section_id) {
        if ($scope.show_section === section_id) {
            $scope.show_section = 0;
        }
        else {
            $scope.show_section = section_id;
        }
        console.log($scope.show_section);
    }
    
    

});



transmedia.controller('mainCtrl', function ($scope, $http, $window, $interval) {

    $scope.current_x = 0;
    $scope.current_y = 0;
    $scope.event;
    $scope.cards;
    
    $http.get('js/data.json')
    .success(function(data, status, headers, config) {
        console.log(data);
        $scope.cards = data;
//        $scope.backgroundResize();
        $interval($scope.backgroundResize, 10000);
    })
    .error(function(data, status, headers, config) {
        
    });
    
    $scope.changePosition = function(offset_x, offset_y) {
        $scope.event = offset_x + ", " + offset_y;
        console.log('entro');
        $scope.current_x =$scope.current_x + offset_x;
        $scope.current_y =$scope.current_y + offset_y;
    }
    
/*    $scope.$watch(function() {
       console.log("resize");
//       $scope.backgroundResize();
    });*/
    
    angular.element($window).bind('resize', function() {
        $scope.backgroundResize();
        //console.log("resize");
    })
    
    $scope.backgroundResize = function() {
        console.log("fullscreen");
        var windowH = $(window).height();
        $(".background").each(function(i){
            console.log(i);
//            $scope.$apply(function () {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if(path.hasClass("parallax")){
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if(contW > imgW){
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
//            });
        });
    }

});
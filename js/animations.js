transmedia.animation('.card-show', function() {

//    console.log($scope.current_x);
    
    var animateAdd = function(element, className, done) {
        var scope = angular.element(element).scope();
        console.log(scope.event);
//        console.log(element.attr('position-x'));
        console.log('Add' + element.attr("position"));
        element.css({
            position : 'absolute',
            top : element.css('height'),
//            left : 0,
            display : 'block'
        });

        jQuery(element).animate({
            top : 0
        }, 500, done);

        return;
    }

    var animateRemove = function(element, className, done) {
        var scope = angular.element(element).scope();
        console.log(scope.event);
//        console.log(element.attr('position-x'));
        console.log('Remove');
        element.css({
            position : 'absolute',
//            left : 0,
            top : 0
        });

        jQuery(element).animate({
            top : -987
        }, 500, done);
        
        return;
    }

    return {
        addClass : animateRemove,
        removeClass : animateAdd
    };
});
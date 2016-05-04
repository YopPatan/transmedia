transmedia.animation('.card-show', function() {

    var animateAdd = function(element, className, done) {
        var scope = angular.element(element).scope();
        console.log(scope.event);
        
        if (scope.event == 'up') {
            event_i = { top: parseInt(element.css('height'), 10) * -1 };
            event_f = { top: 0 };
        }
        else if (scope.event == 'down') {
            event_i = { top: element.css('height') };
            event_f = { top: 0 };
        }
        else if (scope.event == 'left') {
            event_i = { left: parseInt(element.css('width'), 10) * -1 };
            event_f = { left: 0 };
        }
        else if (scope.event == 'right') {
            event_i = { left: element.css('width') };
            event_f = { left: 0 };
        }
        
        element.css({
            display : 'block',
            position : 'absolute'
        });
        
        element.css(event_i);
        jQuery(element).animate(event_f, 500, done);

        return;
    }

    var animateRemove = function(element, className, done) {
        var scope = angular.element(element).scope();
        console.log(scope.event);

        if (scope.event == 'up') {
            event_i = { top: 0 };
            event_f = { top: element.css('height') };
        }
        else if (scope.event == 'down') {
            event_i = { top: 0 };
            event_f = { top: parseInt(element.css('height'), 10) * -1 };
        }
        else if (scope.event == 'left') {
            event_i = { left: 0 };
            event_f = { left: element.css('width') };
        }
        else if (scope.event == 'right') {
            event_i = { left: 0 };
            event_f = { left: parseInt(element.css('width'), 10) * -1};
        }
        
        element.css({
            position : 'absolute',
        });

        element.css(event_i);
        jQuery(element).animate(event_f, 500, done);
        
        return;
    }

    return {
        addClass : animateRemove,
        removeClass : animateAdd
    };
});
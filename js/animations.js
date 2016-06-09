transmedia.animation('.card-show', function() {

    var animateAdd = function(element, className, done) {
        var scope = angular.element(element).scope();
        //console.log(scope.event);
        
        if (scope.event == 'up') {
            event_i = { top: parseInt(element.css('height'), 10) * -1, left: 0, opacity: 1 };
            event_f = { top: 0, left: 0, opacity: 1 };
        }
        else if (scope.event == 'down') {
            event_i = { top: element.css('height'), left: 0, opacity: 1 };
            event_f = { top: 0, left: 0, opacity: 1 };
        }
        else if (scope.event == 'left') {
            event_i = { left: parseInt(element.css('width'), 10) * -1, top: 0, opacity: 1 };
            event_f = { left: 0, top: 0, opacity: 1 };
        }
        else if (scope.event == 'right') {
            event_i = { left: element.css('width'), top: 0, opacity: 1 };
            event_f = { left: 0, top: 0, opacity: 1 };
        }
        else if (scope.event == 'jump') {
            event_i = { left: 0, top: 0, opacity: 0 };
            event_f = { left: 0, top: 0, opacity: 1 };
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
        //console.log(scope.event);

        if (scope.event == 'up') {
            event_i = { top: 0, left: 0, opacity: 1 };
            event_f = { top: element.css('height'), left: 0, opacity: 1 };
        }
        else if (scope.event == 'down') {
            event_i = { top: 0, left: 0, opacity: 1 };
            event_f = { top: parseInt(element.css('height'), 10) * -1, left: 0, opacity: 1 };
        }
        else if (scope.event == 'left') {
            event_i = { left: 0, top: 0, opacity: 1 };
            event_f = { left: element.css('width'), top: 0, opacity: 1 };
        }
        else if (scope.event == 'right') {
            event_i = { left: 0, top: 0, opacity: 1 };
            event_f = { left: parseInt(element.css('width'), 10) * -1, top: 0, opacity: 1 };
        }
        else if (scope.event == 'jump') {
            event_i = { left: 0, top: 0, opacity: 1 };
            event_f = { left: 0, top: 0, opacity: 0 };
        }
        
        element.css({
            position : 'absolute',
        });

        element.css(event_i);
        jQuery(element).animate(event_f, 500, done);
        
        return;
    }

    // La clase que se agrega o se elimina es .ng-hidden
    return {
        addClass : animateRemove,
        removeClass : animateAdd
    };
});

transmedia.animation('.card-depth', function() {

    var animateAdd = function(element, className, done) {
        var scope = angular.element(element).scope();
        
        event_i = { left: 0, top: 0, opacity: 0 };
        event_f = { left: 0, top: 0, opacity: 1 };
        
        element.css({
            display : 'block',
            position : 'absolute'
        });
        
        element.css(event_i);
        jQuery(element).animate(event_f, 500, done);

        return;
    }

    var animateRemove = function(element, className, done) {
        event_i = { left: 0, top: 0, opacity: 1 };
        event_f = { left: 0, top: 0, opacity: 0 };
        
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
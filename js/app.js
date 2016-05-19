'use strict';  // se debe declarar variables

var transmedia = angular.module('transmedia', ['ngRoute', 'ngAnimate', 'ngTouch', 'swipe']);

transmedia.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/main', {
            templateUrl: 'partials/cards.html',
            controller: 'mainCtrl'
        })
        .when('/pos/:pos_x/:pos_y', {
            templateUrl: 'partials/cards.html',
            controller: 'mainCtrl'
        })
/*        .when('/menu', {
            templateUrl: 'partials/menu.html',
            controller: 'menuCtrl'
        })*/
        .otherwise({
           redirectTo: '/main' 
        });
}]);

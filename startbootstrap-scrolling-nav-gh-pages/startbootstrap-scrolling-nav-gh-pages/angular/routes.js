//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/index-view.html',
        	// Which controller it should use 
            controller 		: 'mainController',
            // what is the alias of that controller.
        	controllerAs 	: 'myMatch'
        })
        .when('/:matchyear/:round/:match/',{
            // location of the template
            templateUrl     : 'views/match-view.html',
            // Which controller it should use 
            controller      : 'mainController',
            // what is the alias of that controller.
            controllerAs    : 'myMatch'
        })
        .when('/stats/',{
            // location of the template
            templateUrl     : 'views/stat-view.html',
            // Which controller it should use 
            controller      : 'mainController',
            // what is the alias of that controller.
            controllerAs    : 'myMatch'
        })
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);
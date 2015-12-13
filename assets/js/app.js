var unparApp = angular.module('arthenticApp', [
    'ngRoute',
    'appControllers',
    'ngSanitize',
    'angulartics',
    'infinite-scroll'
]);

unparApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
        when('/home', {

        }).
        otherwise({
            'redirectTo': '/home'
        });
    }]);

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
        when('/menu', {
          'templateUrl': 'partials/menu.html',
          'controller': 'MenuController' //capital awal dan belakang
        }).
        when('/login', {
          'templateUrl': 'partials/login.html',
          'controller': 'LoginController' //capital awal dan belakang
        }).
        when('/register', {
          'templateUrl': 'partials/register.html',
          'controller': 'RegisterController' //capital awal dan belakang
        }).
        otherwise({
            'redirectTo': '/login'
        });
    }]);

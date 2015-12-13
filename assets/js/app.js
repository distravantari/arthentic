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
        when('/invoice', {
          'templateUrl': 'partials/invoice.html',
          'controller': 'InvoiceController' //capital awal dan belakang
        }).
        when('/dashboard', {
          'templateUrl': 'partials/dashboard.html',
          'controller': 'DashboardController' //capital awal dan belakang
        }).
        when('/profile', {
          'templateUrl': 'partials/profile.html',
          'controller': 'ProfileController' //capital awal dan belakang
        }).
        when('/order', {
          'templateUrl': 'partials/order.html',
          'controller': 'OrderController' //capital awal dan belakang
        }).
        otherwise({
            'redirectTo': '/dashboard'
        });
    }]);

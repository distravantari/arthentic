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
        when('/dailyreports', {
          'templateUrl': 'partials/dailyreports.html',
          'controller': 'DailyReportsController' //capital awal dan belakang
        }).
        when('/weeklyreports', {
          'templateUrl': 'partials/weeklyreports.html',
          'controller': 'WeeklyReportsController' //capital awal dan belakang
        }).
        when('/monthlyreports', {
          'templateUrl': 'partials/monthlyreports.html',
          'controller': 'MonthlyReportsController' //capital awal dan belakang
        }).
        when('/employeesdata', {
          'templateUrl': 'partials/datapegawai.html',
          'controller': 'EmployeesDataController' //capital awal dan belakang
        }).
        when('/supplierdata', {
          'templateUrl': 'partials/datasupplier.html',
          'controller': 'SupplierDataController' //capital awal dan belakang
        }).
        when('/datamember', {
          'templateUrl': 'partials/datamember.html',
          'controller': 'MemberDataController' //capital awal dan belakang
        }).
        when('/stockdetail', {
          'templateUrl': 'partials/stockdetail.html',
          'controller': 'StockDetailController' //capital awal dan belakang
        }).
        otherwise({
            'redirectTo': '/login'
        });
    }]);

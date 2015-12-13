var appControllers = angular.module('appControllers', []);
var domain = 'http://wilianto.com/Unpar-Apps-Backend/frontend/web/index.php/v3';
var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

appControllers.controller('MenuController',['$scope','$http',
    function($scope,$http){
        $http.get('assets/js/JSON/menu.json').success(function(data){
            $scope.menu=data;
            $scope.loading = false;
        });
        changeTitleHeader('Radical Menu');
    }
]);

appControllers.controller('LoginController',['$scope','$http',
    function($scope,$http){}
]);

appControllers.controller('RegisterController',['$scope','$http',
    function($scope,$http){}
]);

var x;
appControllers.controller('AspirasiController',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
		$scope.submitAspiration = function(){
				// showLoader(true);
				var name = $scope.form.name;
	      var content = $scope.form.content;
				var img_base64 = $scope.img_base64;

				if(content == undefined || content == ""){
						alert("content harus diisi");
				}else {
						$.ajax({
							url: domain + '/aspirations',
							method: 'POST',
							data: {
								content: content,
								name: name,
								img_base64: img_base64
							},
							success: function(response){
								alert('Aspirasi sudah terkirim!');
							},
							error: function(xhr, status, error){
								alert(error);
							}
						})
				}
		}

		$scope.thumbsup = function(id_aspirasi){
			var code = $scope.code;
			// var status = $scope.status;

			$.ajax({
				url: domain + '/thumbs',
				method: 'POST',
				data: {
					id_aspirasi: id_aspirasi,
					code: 1,
					status: 1
				},
				success: function(response){
					// window.location.reload();
					alert('like');
					// $(this).addClass('text-success');
				},
				error: function(xhr, status, error){
					alert(error);
				},
				complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
			   //do smth if you need
			   document.location.reload();
			 }
			})
		}

		$scope.thumbsdown = function(id_aspirasi){
			var code = $scope.code;
			// var status = $scope.status;

			$.ajax({
				url: domain + '/thumbs',
				method: 'POST',
				data: {
					id_aspirasi: id_aspirasi,
					code: 1,
					status: 0
				},
				success: function(response){
					// window.location.reload();
					alert('dislike');
					// $(this).addClass('text-danger');
				},
				error: function(xhr, status, error){
					alert(error);
				},
				complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
			   //do smth if you need
			   document.location.reload();
			 }
			})
		}

		$scope.busy = false;

		$scope.backLinkClick = function () {
  		window.location.reload();
		};

		$http.get(domain + '/aspirations').success(function(data){
				$scope.aspiration=data;
				x = data;
				$scope.loading = false;
		});

		var page = 1;
		$scope.myPagingFunction = function(){
			if (this.busy) return;
			$scope.busy = true;
			$http.get(domain + '/aspiration?page='+page).success(function(data,status,headers,config){
				if(headers('X-Pagination-Page-Count') < page){
					$scope.busy = false;
					return;
				}
				console.log(headers('link'));
					for (var i = 0; i < data.length; i++) {
						if ($scope.aspiration != undefined && $scope.aspiration != null && $scope.aspiration != "") {
							$scope.aspiration.push(data[i]);
						}
					}
					$scope.loading = false;
					$scope.busy = false;
					page++;
			});
		}

		changeTitleHeader('Aspirasi');
}]);

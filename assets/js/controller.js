var appControllers = angular.module('appControllers', []);
var domain = 'http://localhost';
var fullMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

appControllers.controller('MenuController',['$scope','$http',
    function($scope,$http){

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
  				//change hi, username
          $('#username').html(data.message[0].nama);
          var nama = data.message[0].nama;
          //getPermissionByName
          $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
            var str = data.message[0].permission;
            if (str.length <= 7) {
              var ct = 7-str.length;
              for (var i = 0; i < ct; i++) {
                str += "0";
              }
            }
            else {
              str = str.substring(0, 7);
            }
            if (str.charAt(0)=="1") {
              $('#showReports').removeClass('hidden');
            }
            if (str.charAt(1)=="1") {
              $('#showMenu').removeClass('hidden');
            }
            if (str.charAt(2)=="1") {
              $('#showOrder').removeClass('hidden');
            }
            if (str.charAt(3)=="1") {
              $('#showStockDetail').removeClass('hidden');
            }
            if (str.charAt(4)=="1") {
              $('#showData').removeClass('hidden');
            }
            if (str.charAt(5)=="1") {
              $('#showExpenses').removeClass('hidden');
            }
            if (str.charAt(6)=="1") {
              $('#showSetting').removeClass('hidden');
            }
      		});
  		});

      $('.bars').removeClass('hidden');

      $scope.menu = [{}];
      var idx = 0;
      $scope.totalHarga = function() {
       var resultTTC = 0;

       angular.forEach($scope.menu, function(menu) {
         resultTTC += menu.montantTTC * menu.quantite;
       });
       return resultTTC;
     };

     $scope.totalHarga = function() {
       var resultHT = 0;

       angular.forEach($scope.menu, function(menu) {
         resultHT += menu.montantHT * menu.quantite;
       });
       return resultHT;
     };

     $scope.jumlahPesanan = function() {
       var resultArticle = 0;

       angular.forEach($scope.menu, function(menu) {
         resultArticle += menu.quantite;
       });
       return resultArticle;
     };

     $scope.tambah = function() {
       $scope.menu.push({
         id: '',
         name: '',
         composition: '',
         price: 0,
         hapus: '',
       });
       idx++;
     };

     $scope.update = function (index) {
       var id = $scope.menu[index].id;
       var name = $scope.menu[index].nama;
       var composition = $scope.menu[index].komposisi;
       var price = $scope.menu[index].harga;
       var quantity = $scope.menu[index].kuantitas;

       $.ajax({
         url: domain + ':3000/api/updateMenu',
         dataType: 'text',
         method: 'POST',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
           id:id,
           idBaru:id,
           namaBaru:name,
           komposisiBaru:composition,
           hargaBaru:price,
           kuantitasBaru:quantity,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           obj = JSON.parse(response);
          //  alert(obj.message);
          // swal({   title: "Sweet!",   text: "successfully updated"});
          //  document.location.reload();
         },
         error: function(xhr, status, error){
           alert(error);
         },
         complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
          //do smth if you need
         //  document.location.reload();
        }
      });

      //insertHistory
      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
        $.ajax({
          url: domain + ':3000/api/insertHistory',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            namaUser:data.message[0].nama,
            perubahan:'menu',
            row:index+1,
            status:'update',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
           //  alert(obj.message);
           swal({   title: "Sweet!",   text: "successfully updated"});
           //  document.location.reload();
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
  		});
     }

     $scope.save = function () {
       var id = $scope.menu[idx].id;
       var name = $scope.menu[idx].nama;
       var composition = $scope.menu[idx].komposisi;
       var price = $scope.menu[idx].harga;
       var quantity = $scope.menu[idx].kuantitas;

        $.ajax({
          url: domain + ':3000/api/inputMenu',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            id:id,
            nama:name,
            komposisi:composition,
            harga:price,
            kuantitas:quantity,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "input menu berhasil dengan nama "+name) {
              // alert(obj.message);
              swal("Good job!", obj.message, "success");
              // document.location.reload();
              $('#btnplus').removeClass('hidden');
            }
            else {
              // alert("input tidak boleh kosong");
              swal({   title: "Alert!",   text: "input tidak boleh kosong.",   timer: 2000,   showConfirmButton: false });
            }
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });

       //insertHistory
       $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
         $.ajax({
           url: domain + ':3000/api/insertHistory',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             namaUser:data.message[0].nama,
             perubahan:'menu',
             row:idx+1,
             status:'insert',
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
            //  alert(obj.message);
            swal({   title: "Sweet!",   text: "successfully updated"});
            //  document.location.reload();
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
   		});
     }

     $scope.delete = function(index) {
       var id = $scope.menu[index].id;
       $.ajax({
         url: domain + ':3000/api/deleteMenu',
         dataType: 'JSON',
         method: 'POST',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
           id:id,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
          idx--;
          swal({
             title: "Are you sure?",
             text: "You will not be able to recover this imaginary file!",
             type: "warning",   showCancelButton: true,
             timer: 2000,
             confirmButtonColor: "#DD6B55",
             confirmButtonText: "Yes, delete it!",
             cancelButtonText: "No, cancel plx!",
             closeOnConfirm: false,
             closeOnCancel: false },
             function(isConfirm){
               if (isConfirm) {
                 swal("Deleted!", "Your file has been deleted.", "success");
                 document.location.reload();
               }
               else {
                  swal("Cancelled", "Your file is safe :)", "error");
                }
              });

         },
         error: function(xhr, status, error){
           alert(error);
         },
         complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
          //do smth if you need
         //  document.location.reload();
        }
      });

        //insertHistory
        $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          $.ajax({
            url: domain + ':3000/api/insertHistory',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              namaUser:data.message[0].nama,
              perubahan:'menu',
              row:index+1,
              status:'delete',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
             swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
             //  document.location.reload();
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       });
     }

     $.ajax({
       url: domain + ':3000/api/showMenu',
       dataType: 'JSON',
       method: 'POST',
       contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
       data: {
         token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
       },
       success: function(response){
         for (var i = 0; i < response.message.length; i++) {
           $scope.menu.push(response.message[i]);
         }
         $scope.menu.splice(0, 1);
         idx = $scope.menu.length-1;
         $scope.loading = false;
       },
       error: function(xhr, status, error){
         alert(error);
         // document.location.reload();
       },
       complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
        //do smth if you need
       //  document.location.reload();
      }
    });

    changeTitleHeader('Radical Menu');
    }
]);

appControllers.controller('LoginController',['$scope','$http',
    function($scope,$http){
      $scope.updateStatus = function () {
        var user = $scope.form.username;
        $.ajax({
          url: domain + ':3000/api/updateStatus',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            nama: user,
            status: "online",
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            // alert(user);
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }


      $scope.userlogin = function(){
        var user = $scope.form.username;
        var pass = $scope.form.password;

        $.ajax({
          url: domain + ':3000/api/login',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            nama: user,
            password: pass,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "Nama atau password salah ") {
              // alert(obj.message);
              swal({
                title: "Are you sure you enter it right?",
                text: "You enter a wrong username and password!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Try again",
                closeOnConfirm: false }, function(){
                  swal("another chances!", "we give you another chances.", "success");
                });
            }
            else {
              // alert(obj.message);
              swal("Good Job!", obj.message, "success")
              window.location.assign(domain+":8080/arthentic/#/dashboard");
              $('#username').text(user);
            }
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }

      $('.bars').addClass('hidden');
      changeTitleHeader('RADICAL LOGIN');
    }
]);

appControllers.controller('RegisterController',['$scope','$http',
    function($scope,$http){
      $('.bars').addClass('hidden');

      $scope.registeruser = function () {
        var user = $scope.form.username;
        var pass = $scope.form.password;
        var role = $scope.form.role;
        var perm = $scope.form.permission;

        $.ajax({
          url: domain + ':3000/api/registrasi',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            nama: user,
            role: role,
            password: pass,
            permission:perm,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === ("Registrasi berhasil atas nama "+user)) {
              window.location.assign(domain+":8080/arthentic/");
            }
            else {
              // alert(obj.message);
              // window.location.assign(domain+":8080/arthentic/#/dashboard")
            }
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }
      changeTitleHeader('THIS PAGE IS ONLY FOR OWNER');
    }
]);

appControllers.controller('InvoiceController',['$scope','$http','$window',
    function($scope,$http,$window){
      $('.bars').removeClass('hidden');

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
  				// $('#username').text(data.message.nama);
            $('#username').html(data.message[0].nama);
            // alert(data.message[0].nama);
  		});

      $scope.invoice = [{}];

      $http.get('http://localhost:3000/api/invoices?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ').success(function(data){
          $scope.invoice = data.message;
  				$scope.loading = false;
  		});

      $scope.deleteInvoice = function () {
        $http.get('http://localhost:3000/api/deleteInvoices?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
            swal("Good job!", data.message, "success");
    				$scope.loading = false;
    		});
      }

      $scope.printInvoice = function () {
       var printButton = document.getElementById("printButton");
       var deleteButton = document.getElementById("deleteButton");
       printButton.style.visibility = 'hidden';
       deleteButton.style.visibility = 'hidden';
       $window.print();
       printButton.style.visibility = 'visible';
       deleteButton.style.visibility = 'visible';
       $http.get('http://localhost:3000/api/deleteInvoices?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
           swal("Good job!", data.message, "success");
           $scope.loading = false;
       });
      }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.invoice, function (inv) {
           resultHT += Number(inv.totalSatuan);
         });

        return resultHT;
      }
      changeTitleHeader('Invoice');
    }
]);

appControllers.controller('DashboardController',['$scope','$http',
    function($scope,$http){

      $('.bars').removeClass('hidden');

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          //change hi, username
          $('#username').html(data.message[0].nama);
          var nama = data.message[0].nama;
          //getPermissionByName
          $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
            var str = data.message[0].permission;
            if (str.length <= 7) {
              var ct = 7-str.length;
              for (var i = 0; i < ct; i++) {
                str += "0";
              }
            }
            else {
              str = str.substring(0, 7);
            }
            if (str.charAt(0)=="1") {
              $('#showReports').removeClass('hidden');
            }
            if (str.charAt(1)=="1") {
              $('#showMenu').removeClass('hidden');
            }
            if (str.charAt(2)=="1") {
              $('#showOrder').removeClass('hidden');
            }
            if (str.charAt(3)=="1") {
              $('#showStockDetail').removeClass('hidden');
            }
            if (str.charAt(4)=="1") {
              $('#showData').removeClass('hidden');
            }
            if (str.charAt(5)=="1") {
              $('#showExpenses').removeClass('hidden');
            }
            if (str.charAt(6)=="1") {
              $('#showSetting').removeClass('hidden');
            }
      		});
  		});

      $http.get('http://localhost:3000/api/menuTotal?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
  				$scope.order=data.message.length;
          $(".order").text($scope.order);
  				$scope.loading = false;
  		});

      $http.get('http://localhost:3000/api/membersTotal?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(memberData){
          $scope.member=memberData.message.length;
          $(".member").text($scope.member);
          $scope.loading = false;
      });

      $http.get('http://localhost:3000/api/usersTotal?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(userData){
          $scope.user=userData.message.length;
          $(".user").text($scope.user);
          $scope.loading = false;
      });

      $http.get('http://localhost:3000/api/ordersTotal?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(orderData){
          $scope.order=orderData.message.length;
          $(".order").text($scope.order);
          $scope.loading = false;
      });

      changeTitleHeader('RADICAL DASHBOARD');
    }
]);

appControllers.controller('ProfileController',['$scope','$http',
    function($scope,$http){
      changeTitleHeader('Profile');
    }
]);

appControllers.controller('DailyReportsController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      changeTitleHeader('Daily Reports');
      $scope.dailys = [{}];

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $scope.total = function (idx) {
        var price = $scope.dailys[idx].HargaAkhir;
        var quantity = $scope.dailys[idx].Quantity;

        $scope.dailys[idx].total = price*quantity;
      }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.dailys, function (daily) {
           resultHT += daily.total;
         });

        return resultHT;
      }

      $scope.proceed = function () {
        $('.bars').removeClass('hidden');
        var tanggal = $scope.input.tanggal;

        // split input
        var temp = tanggal.split("/");
        tanggal = temp[2]+"/"+temp[0]+"/"+temp[1];

        $.ajax({
          url: domain + ':3000/api/hitungHarian',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            date: tanggal,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            // alert(response.message.length);
            for (var i = 0; i < response.message.length; i++) {
              $scope.dailys.push(response.message[i]);
            }
            $scope.dailys.splice(0, 1);
            $scope.loading = false;
            // alert(response.message[0].Id);
            // window.location.assign(domain+":8080/arthentic/#/dashboard")
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }
    }
]);

appControllers.controller('WeeklyReportsController',['$scope','$http',
    function($scope,$http){
      $scope.weekly = [{}];

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $scope.total = function (idx) {
        var price = $scope.weekly[idx].HargaAkhir;
        var quantity = $scope.weekly[idx].Quantity;

        $scope.weekly[idx].total = price*quantity;
      }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.weekly, function (week) {
           resultHT += week.total;
         });

        return resultHT;
      }

      $scope.proceed = function () {
        $('.bars').removeClass('hidden');
        var startdate = $scope.input.startdate;
        var enddate = $scope.input.enddate;

        // split startdate
        var tempS = startdate.split("/");
        startdate = tempS[2]+"/"+tempS[0]+"/"+tempS[1];

        // split enddate
        var tempE = enddate.split("/");
        enddate = tempE[2]+"/"+tempE[0]+"/"+tempE[1];

        $.ajax({
          url: domain + ':3000/api/hitungMingguan',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            startdate: startdate,
            enddate: enddate,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.weekly.push(response.message[i]);
            }
            $scope.weekly.splice(0, 1);
            $scope.loading = false;
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
        });
      }
      changeTitleHeader('Weekly Reports');
    }
]);

appControllers.controller('MonthlyReportsController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.incomes = [{}];
      $scope.exps = [{}];

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
  				//change hi, username
          $('#username').html(data.message[0].nama);
          var nama = data.message[0].nama;
          //getPermissionByName
          $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
            var str = data.message[0].permission;
            if (str.length <= 7) {
              var ct = 7-str.length;
              for (var i = 0; i < ct; i++) {
                str += "0";
              }
            }
            else {
              str = str.substring(0, 7);
            }
            if (str.charAt(0)=="1") {
              $('#showReports').removeClass('hidden');
            }
            if (str.charAt(1)=="1") {
              $('#showMenu').removeClass('hidden');
            }
            if (str.charAt(2)=="1") {
              $('#showOrder').removeClass('hidden');
            }
            if (str.charAt(3)=="1") {
              $('#showStockDetail').removeClass('hidden');
            }
            if (str.charAt(4)=="1") {
              $('#showData').removeClass('hidden');
            }
            if (str.charAt(5)=="1") {
              $('#showExpenses').removeClass('hidden');
            }
            if (str.charAt(6)=="1") {
              $('#showSetting').removeClass('hidden');
            }
      		});
  		});

      $scope.getMonth = function () {
        var date = $scope.input.month;

        // split input
        var temp = date.split("/");
        var mnth = temp[0]-1;
        return fullMonths[mnth];
      }

      $scope.totalPendapatan = function () {
        var resultHT =0;

         angular.forEach($scope.incomes, function (income) {
           resultHT += income.hargaAkhir;
         });
        //  $scope.income.pendapatan = resultHT;
        return resultHT;
      }

      $scope.totalPengeluaran = function () {
        var resultHT =0;

         angular.forEach($scope.exps, function (exp) {
           resultHT += exp.jumlah;
         });
        //  $scope.exp.pengeluaran = resultHT;
        return resultHT;
      }
      var tax;
      $scope.getTax = function () {
        $.ajax({
          url: domain + ':3000/api/getPajakPendapatan',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            tax = response.message[0].pajakPendapatan;
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
        });
        return tax/100;
      }

      //hitung pendapatan Bulanan
      $scope.proceed = function () {
        var date = $scope.input.month;

        // split input
        var temp = date.split("/");
        var mmMon = temp[0];
        var yyMon = temp[2];
        $.ajax({
          url: domain + ':3000/api/hitungBulanan',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            bulan: mmMon,
            tahun: yyMon,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.incomes.push(response.message[i]);
            }
            $scope.incomes.splice(0, 1);
            $scope.loading = false;
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
        });
        // show pengeluaran bulan
        $.ajax({
          url: domain + ':3000/api/showPengeluaran',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            bulan: mmMon,
            tahun: yyMon,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.exps.push(response.message[i]);
            }
            $scope.exps.splice(0, 1);
            $scope.loading = false;
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
        });
      }

      changeTitleHeader('Monthly Reports');
    }
]);

appControllers.controller('ExpensesController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.expenses = [{}];
      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});
      var i=0;
      $scope.tambah = function() {
        i++;
        $scope.expenses.push({
          id: '',
          reference: '',
          titre: '',
          price: 0,
          quantity: 0,
          discount: 0,
          total:0
        });
        ord++;
      };

      $scope.save = function () {
        for (var i = 0; i < $scope.expenses.length; i++) {
           var bulanexp = $scope.expenses[i].bulan;
           var tahunexp = $scope.expenses[i].tahun;
           var namaexp = $scope.expenses[i].namaPengeluaran;
           var jumlahexp = $scope.expenses[i].jumlah;

           $.ajax({
             url: domain + ':3000/api/insertPengeluaran',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               bulan:bulanexp,
               tahun:tahunexp,
               nama:namaexp,
               jumlah:jumlahexp,
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response)
               if (obj.message === "berhasil input data pengeluaran") {
                 // alert(obj.message);
                 swal("Good job!", obj.message, "success");
                 // $('.btnplus').removeClass('hidden');
                 document.location.reload();
               }
               else {
                 alert("input tidak boleh kosong");
               }
             },
             error: function(xhr, status, error){
               alert(error);
               // document.location.reload();
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
          //insertHistory
          $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
            $.ajax({
              url: domain + ':3000/api/insertHistory',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                namaUser:data.message[0].nama,
                perubahan:'expenses',
                row:i,
                status:'insert'+" "+namaexp,
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
              },
              success: function(response){
                obj = JSON.parse(response);
               //  alert(obj.message);
               swal({   title: "Sweet!",   text: "successfully updated"});
               document.location.reload();
               //  document.location.reload();
              },
              error: function(xhr, status, error){
                alert(error);
              },
              complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
               //do smth if you need
              //  document.location.reload();
             }
           });
         });
        }
      }

      changeTitleHeader('Expenses');
    }
]);

appControllers.controller('ExpensesReportsController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.expensesReports = [{}];
      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $scope.getMonth = function () {
        var tanggalExpenses = $scope.input.tanggal;
        // split input
        var temp = tanggalExpenses.split("/");
        // tanggalExpenses = temp[2]+"/"+temp[0];
        var mmExpenses = temp[0]-1;
        return fullMonths[mmExpenses];
      }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.expensesReports, function (expReport) {
           resultHT += expReport.jumlah;
         });

        return resultHT;
      }

      $scope.proceed = function () {
        var tanggalExpenses = $scope.input.tanggal;
        // split input
        var temp = tanggalExpenses.split("/");
        // tanggalExpenses = temp[2]+"/"+temp[0];
        var mmExpenses = temp[0];
        var yyExpenses = temp[2];

        $.ajax({
          url: domain + ':3000/api/showPengeluaran',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            bulan:Number(mmExpenses),
            tahun:Number(yyExpenses),
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.expensesReports.push(response.message[i]);
            }
            $scope.expensesReports.splice(0, 1);
            idx = $scope.expensesReports.length-1;
            $scope.loading = false;
          },
          error: function(xhr, status, error){
            // alert(error);
            throw error;
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }
      changeTitleHeader('Expenses Reports');
    }
]);

appControllers.controller('OrderController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi,username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $scope.articles = [{}];
      var i = 0;
      var ord = 1;
      //getDate
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy+'/'+mm+'/'+dd;
      $(".todaysdate").text(today);

      $scope.getIdOrd = function () {
        // $http.get(domain + '/getIdOrder?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2ODI5NzR9.DDi364QgxovNjg17YhVTyIb-BVbp9Xh0Nzzk4cpLXIw').success(function(data){
    		// 		ord=data[0].message.nomerOrder;
        //    ord++;
    		// 		$scope.loading = false;
    		// });
        $scope.articles[i].id = ord;
      }

      $scope.getMenuById = function (idx) {
        // alert(i);
        var idmenu = $scope.articles[idx].reference;

        $.ajax({
          url: domain + ':3000/api/showMenuById',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            id:idmenu,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            // alert(response.message[0].nama);
            if (response.message[0].nama == 'menu habis/tidak ada') {
              $scope.articles[idx].titre = response.message[0].nama;
            }else{
              var harga = Number(response.message[0].harga)
              $scope.articles[idx].price = harga;
              $scope.articles[idx].titre = response.message[0].nama;
            }

          },
          error: function(xhr, status, error){
            // alert(error);
            throw error;
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }

      $scope.confirm = function(idx){
        var idorder = $scope.articles[idx].id;
        var idmenu = $scope.articles[idx].reference;
        var menuname = $scope.articles[idx].titre;
        var price = $scope.articles[idx].price;
        var quantity = $scope.articles[idx].quantity;
        var discount = $scope.articles[idx].discount;

        var total = (Number(price)*Number(quantity))-(Number(discount/100)*(Number(price)*Number(quantity)));
        $scope.articles[idx].total=total;
      }

      $scope.PrixTotalTTC = function() {
       var resultTTC = 0;

       angular.forEach($scope.articles, function(article) {
         resultTTC += article.total * article.quantite;
       });

       return resultTTC;
     };

     $scope.SubTotal = function() {
       var resultHT =0;

        angular.forEach($scope.articles, function (article) {
          resultHT += article.total;
        });

       return resultHT;
     };

     $scope.NumberOrder = function() {
       var resultArticle = 0;

       angular.forEach($scope.articles, function(article) {
         resultArticle += article.quantity;
       });
       return resultArticle;
     };

    $scope.tambah = function() {
      i++;
      $scope.articles.push({
        id: '',
        reference: '',
        titre: '',
        price: 0,
        quantity: 0,
        discount: 0,
        total:0
      });
      ord++;
    };

     $scope.delete = function(index) {
       $scope.articles.splice(index, 1);
       i--;
     }

     $scope.save = function () {
       for (var i = 0; i < $scope.articles.length; i++) {
          var idorder = $scope.articles[i].id;
          var idmenu = $scope.articles[i].reference;
          var menuname = $scope.articles[i].titre;
          var price = $scope.articles[i].price;
          var quantity = $scope.articles[i].quantity;
          var discount = $scope.articles[i].discount;
          var total = $scope.articles[i].total;


         //kurangStokdiorder
         var querry = "http://localhost:3000/api/showMenuById?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+idmenu;
         $.get(querry).success(function(data){
            var composition = data.message[0].komposisi;
            var res = composition.split(",");

            for (var i = 0; i < res.length; i++) {
              var stock = res[i].split(" ");
              var namaStock = stock[0];
              var jumlahStock = stock[1];
              var total = jumlahStock*quantity;
               $.ajax({
                 url: domain + ':3000/api/kurangStok',
                 dataType: 'text',
                 method: 'POST',
                 contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                 data: {
                   nama:namaStock,
                   jumPengurangan:total,
                   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                 },
                 success: function(response){
                   obj = JSON.parse(response);
                   // alert(obj.message);
                   if (obj.message === "error") {
                     swal({
                          title: "Insufficient Stock!?",
                          text: "Sisa stok tidak mencukupi",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",
                          confirmButtonText: "Try Again!",
                          closeOnConfirm: false
                        },
                          function(){
                            swal("Okay!", "You got another chance.", "success");
                      });
                   }
                   else {
                     swal({   title: "Berhasil mengurangi stok",   text: obj.message});
                   }
                 },
                 error: function(xhr, status, error){
                   alert(error);
                 },
                 complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
                  //do smth if you need
                 //  document.location.reload();
                }
              });

              $.ajax({
                url: domain + ':3000/api/reorderStok',
                dataType: 'text',
                method: 'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: {
                  nama:namaStock,
                  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                },
                success: function(response){
                  obj = JSON.parse(response);
                  // alert(obj.message);
                  // swal({   title: "Saatnya Order?",   text: obj.message});
                  if (obj.message=="stock ini hampir habis") {
                    var stockThat = "http://localhost:3000/api/getStockThatEmpty?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";
                     $.get(stockThat).success(function(data){
                      //  alert(data.message.length);
                      for (var j = 0; j < data.message.length; j++) {
                          // alert(data.message[j].nama);
                          $.ajax({
                            url: domain + ':3000/api/showMenuFromKomposition',
                            dataType: 'text',
                            method: 'POST',
                            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                            data: {
                              name:data.message[j].nama,
                              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
                            },
                            success: function(response){
                              alert(response);
                            },
                            error: function(xhr, status, error){
                              alert(error);
                            },
                            complete: function(){
                           }
                         });
                      }
                    });
                  }
                },
                error: function(xhr, status, error){
                  alert(error);
                },
                complete: function(){
               }
             });
           }
     		});

          $.ajax({
            url: domain + ':3000/api/insertOrder',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              nomerorder:idorder,
              id:idmenu,
              date:today,
              pesanan:menuname,
              quantity:quantity,
              diskon:discount,
              hargasatuan:price,
              hargaTotal:total,
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
              // alert(obj.message);
              if (obj.message === "error") {
                swal({
                     title: "Input Order gagal!",
                     text: "Periksa input dengan Benar",
                     type: "warning",
                     showCancelButton: true,
                     confirmButtonColor: "#DD6B55",
                     confirmButtonText: "Try Again!",
                     closeOnConfirm: false
                   },
                     function(){
                       swal("Okay!", "You got another chance.", "success");
                 });
              }
              else {
                swal("Good job!", "Berhasil Input Order", "success");
              }
            },
            error: function(xhr, status, error){
              alert(error);
              // document.location.reload();
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       }
     }

     $scope.print = function () {
       for (var i = 0; i < $scope.articles.length; i++) {

         var name = $scope.articles[i].titre;
         var quantity = $scope.articles[i].quantity;
         var total = $scope.articles[i].total;
         var diskon = $scope.articles[i].discount;
         var price = $scope.articles[i].price;

         $.ajax({
           url: domain + ':3000/api/insertInvoice',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             name:name,
             kuantitas:quantity,
             satuan:total,
             diskon:diskon,
             hargaSatuan:price,
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response)
             if (obj.message === "success") {
             }
             else {
              //  alert("id order tidak boleh kosong");
             }
           },
           error: function(xhr, status, error){
           },
           complete: function(){}
        });

       }
       document.location.assign(domain+':8080/arthentic/#/invoice');
     }

      changeTitleHeader('RADICAL Order');
    }
]);

appControllers.controller('EmployeesDataController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $scope.employees = [{}];
      var idx = 0;

      $.ajax({
        url: domain + ':3000/api/showPegawai',
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        },
        success: function(response){
          for (var i = 0; i < response.message.length; i++) {
            $scope.employees.push(response.message[i]);
          }
          $scope.employees.splice(0, 1);
          idx = $scope.employees.length-1;
          $scope.loading = false;
        },
        error: function(xhr, status, error){
          alert(error);
          // document.location.reload();
        },
        complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
         //do smth if you need
        //  document.location.reload();
       }
     });

      $scope.tambah = function() {
        $scope.employees.push({
          id: '',
          name: '',
          composition: '',
          price: 0,
          hapus: '',
        });
        idx++;
      };

      $scope.delete = function(index) {
        var id = $scope.employees[index].nik;
        $.ajax({
          url: domain + ':3000/api/deletePegawai',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            nik:id,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            // alert(response.message);
            swal({   title: "Deleted!",   text: "successfully updated"});
            idx--;
            document.location.reload();
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });

         //insertHistory
         $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
           $.ajax({
             url: domain + ':3000/api/insertHistory',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               namaUser:data.message[0].nama,
               perubahan:'employee',
               row:index+1,
               status:'delete',
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response);
              //  alert(obj.message);
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
              //  document.location.reload();
             },
             error: function(xhr, status, error){
               alert(error);
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
        });
      }

      $scope.update = function (index) {
        var id = $scope.employees[index].nik;
        var name = $scope.employees[index].nama;
        var alamat = $scope.employees[index].alamat;
        var jabatan = $scope.employees[index].jabatan;
        var tgllahir = $scope.employees[index].tanggallahir;
        var gaji = $scope.employees[index].gaji;

        $.ajax({
          url: domain + ':3000/api/updatePegawai',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            nik:id,
            nama:name,
            alamat:alamat,
            jabatan:jabatan,
            tanggallahir:tgllahir,
            gaji:gaji,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "Berhasil Update") {
            swal({   title: "Sweet!",   text: "successfully updated"});
              // document.location.reload();
            }
            else {
              alert("input tidak boleh kosong");
            }
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });

       //insertHistory
       $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
         $.ajax({
           url: domain + ':3000/api/insertHistory',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             namaUser:data.message[0].nama,
             perubahan:'employee',
             row:index+1,
             status:'update',
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
            //  alert(obj.message);
            swal({   title: "Sweet!",   text: "successfully updated"});
            document.location.reload();
            //  document.location.reload();
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
      });
      }

      $scope.save = function () {
        var id = $scope.employees[idx].nik;
        var name = $scope.employees[idx].nama;
        var alamat = $scope.employees[idx].alamat;
        var jabatan = $scope.employees[idx].jabatan;
        var tgllahir = $scope.employees[idx].tanggallahir;
        var gaji = $scope.employees[idx].gaji;

         $.ajax({
           url: domain + ':3000/api/insertPegawai',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             nik:id,
             nama:name,
             alamat:alamat,
             jabatan:jabatan,
             tanggallahir:tgllahir,
             gaji:gaji,
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
             if (obj.message === "input pegawai berhasil") {
              //  alert(obj.message);
               swal({   title: "Sweet!",   text: "successfully inserted"});
               $('.plusbtn').removeClass('hidden');
               document.location.reload();
             }
             else {
               alert("input tidak boleh kosong");
             }
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
        //insertHistory
        $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          $.ajax({
            url: domain + ':3000/api/insertHistory',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              namaUser:data.message[0].nama,
              perubahan:'employee',
              row:idx+1,
              status:'insert',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
             swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
             //  document.location.reload();
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       });
      }

      changeTitleHeader('RADICAL Employees Data');
    }
]);

appControllers.controller('SupplierDataController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.suppliers = [{}];
      var idx = 0;

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				// change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $.ajax({
        url: domain + ':3000/api/showSupplier',
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          // nama: user,
          // role: role,
          // password: pass,
          // permission:perm,
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        },
        success: function(response){
          for (var i = 0; i < response.message.length; i++) {
            $scope.suppliers.push(response.message[i]);
          }
          $scope.suppliers.splice(0, 1);
          idx = $scope.suppliers.length-1;
          $scope.loading = false;
        },
        error: function(xhr, status, error){
          alert(error);
          // document.location.reload();
        },
        complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
         //do smth if you need
        //  document.location.reload();
       }
     });

       $scope.tambah = function() {
         $scope.suppliers.push({
           id: '',
           reference: '',
           titre: '',
           price: 0,
           quantity: 0,
           discount: 0,
           total:0
         });
         idx++;
       };

       $scope.delete = function(index) {
         var id = $scope.suppliers[index].nis;
         $.ajax({
           url: domain + ':3000/api/deleteSupplier',
           dataType: 'JSON',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             nis:id,
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
            //  alert(response.message);
            swal({   title: "Deleted!",   text: "successfully deleted"});
             idx--;
             document.location.reload();
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
          //insertHistory
          $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
            $.ajax({
              url: domain + ':3000/api/insertHistory',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                namaUser:data.message[0].nama,
                perubahan:'supplier',
                row:index+1,
                status:'delete',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
              },
              success: function(response){
                obj = JSON.parse(response);
               //  alert(obj.message);
               swal({   title: "Sweet!",   text: "successfully updated"});
               document.location.reload();
               //  document.location.reload();
              },
              error: function(xhr, status, error){
                alert(error);
              },
              complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
               //do smth if you need
              //  document.location.reload();
             }
           });
         });
       }

       $scope.update = function (index) {
         var id = $scope.suppliers[index].nis;
         var name = $scope.suppliers[index].nama;
         var alamat = $scope.suppliers[index].alamat;
         var telp = $scope.suppliers[index].nomertelepon;
         $.ajax({
           url: domain + ':3000/api/updateSupplier',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             nis:id,
             nama:name,
             alamat:alamat,
             nomertelepon:telp,
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
             if (obj.message === "Berhasil Update Supplier") {
              //  alert(obj.message);
              swal({   title: "Sweet!",   text: "successfully updated"});
               document.location.reload();
             }
             else {
               alert(obj.message);
             }
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
          //insertHistory
          $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
            $.ajax({
              url: domain + ':3000/api/insertHistory',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                namaUser:data.message[0].nama,
                perubahan:'supplier',
                row:index+1,
                status:'update',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
              },
              success: function(response){
                obj = JSON.parse(response);
               //  alert(obj.message);
               swal({   title: "Sweet!",   text: "successfully updated"});
               document.location.reload();
               //  document.location.reload();
              },
              error: function(xhr, status, error){
                alert(error);
              },
              complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
               //do smth if you need
              //  document.location.reload();
             }
           });
         });
       }

       $scope.save = function () {
         var id = $scope.suppliers[idx].nis;
         var name = $scope.suppliers[idx].nama;
         var alamat = $scope.suppliers[idx].alamat;
         var nomertelepon = $scope.suppliers[idx].nomertelepon;

          $.ajax({
            url: domain + ':3000/api/insertSupplier',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              nis:id,
              nama:name,
              alamat:alamat,
              nomertelepon:nomertelepon,
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
              if (obj.message === "input supplier berhasil") {
                // alert(obj.message);
                swal("Good job!", obj.message, "success");
                $('.plusbtn').removeClass('.hidden');
                document.location.reload();
              }
              else {
                alert("input tidak boleh kosong");
              }
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
         //insertHistory
         $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
           $.ajax({
             url: domain + ':3000/api/insertHistory',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               namaUser:data.message[0].nama,
               perubahan:'supplier',
               row:idx+1,
               status:'insert',
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response);
              //  alert(obj.message);
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
              //  document.location.reload();
             },
             error: function(xhr, status, error){
               alert(error);
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
        });
       }

      changeTitleHeader('RADICAL Supplier Data');
    }
]);

appControllers.controller('MemberDataController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.members = [{}];
      var idx = 0;

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				//change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $.ajax({
        url: domain + ':3000/api/showCustomer',
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          // nama: user,
          // role: role,
          // password: pass,
          // permission:perm,
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        },
        success: function(response){
          for (var i = 0; i < response.message.length; i++) {
            $scope.members.push(response.message[i]);
          }
          $scope.members.splice(0, 1);
          idx = $scope.members.length-1;
          $scope.loading = false;
        },
        error: function(xhr, status, error){
          alert(error);
          // document.location.reload();
        },
        complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
         //do smth if you need
        //  document.location.reload();
       }
     });
     $scope.tambah = function() {
       $scope.members.push({
         kodemember: '',
         nama: '',
         alamat: '',
         tanggallahir: '',
         startmember: '',
         endmember: ''
       });
       idx++;
     };

     $scope.delete = function(index) {
       var id = $scope.members[index].kodemember;

       $.ajax({
         url: domain + ':3000/api/deleteCustomer',
         dataType: 'JSON',
         method: 'POST',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
           kodemember:id,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           idx--;
           document.location.reload();
         },
         error: function(xhr, status, error){
           alert(error);
         },
         complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
          //do smth if you need
         //  document.location.reload();
        }
      });
        //insertHistory
        $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          $.ajax({
            url: domain + ':3000/api/insertHistory',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              namaUser:data.message[0].nama,
              perubahan:'member',
              row:index+1,
              status:'delete',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
             swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
             //  document.location.reload();
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       });
     };

     $scope.update = function (index) {
       var id = $scope.members[index].kodemember;
       var name = $scope.members[index].nama;
       var alamat = $scope.members[index].alamat;
       var tgl = $scope.members[index].tanggallahir;
       var start = $scope.members[index].startmember;
       var end = $scope.members[index].endmember;

       $.ajax({
         url: domain + ':3000/api/updateCustomer',
         dataType: 'text',
         method: 'POST',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
           kodemember:id,
           nama:name,
           alamat:alamat,
           tanggallahir:tgl,
           startmember:start,
           endmember:end,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           obj = JSON.parse(response);
           if (obj.message === "Berhasil Update Customer") {
            //  alert(obj.message);
            swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
           }
           else {
             alert(obj.message);
           }
         },
         error: function(xhr, status, error){
           alert(error);
         },
         complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
          //do smth if you need
         //  document.location.reload();
        }
      });
        //insertHistory
        $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          $.ajax({
            url: domain + ':3000/api/insertHistory',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              namaUser:data.message[0].nama,
              perubahan:'member',
              row:index+1,
              status:'update',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
             swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
             //  document.location.reload();
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       });
     }

     $scope.save = function () {
       var id = $scope.members[idx].kodemember;
       var name = $scope.members[idx].nama;
       var alamat = $scope.members[idx].alamat;
       var tgl = $scope.members[idx].tanggallahir;
       var start = $scope.members[idx].startmember;
       var end = $scope.members[idx].endmember;

        $.ajax({
          url: domain + ':3000/api/insertCustomer',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            kodemember:id,
            nama:name,
            alamat:alamat,
            tanggallahir:tgl,
            startmember:start,
            endmember:end,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "input customer berhasil") {
              // alert(obj.message);
              $('.plusbtn').removeClass('.hidden');
              document.location.reload();
            }
            else {
              alert(obj.message);
            }
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
       //insertHistory
       $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
         $.ajax({
           url: domain + ':3000/api/insertHistory',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             namaUser:data.message[0].nama,
             perubahan:'member',
             row:idx+1,
             status:'insert',
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
            //  alert(obj.message);
            swal({   title: "Sweet!",   text: "successfully updated"});
            document.location.reload();
            //  document.location.reload();
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });
      });
     }
    changeTitleHeader('RADICAL Data Member');
    }
]);

appControllers.controller('SettingController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');

      $scope.history = [{}];
      $scope.settings = [{}];

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				// change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $.get('http://localhost:3000/api/showSetting?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
            $scope.settings = data.message;
  		});

      $scope.savesetting = function () {
        var tax = $scope.settings[0].tax;
        var service = $scope.settings[0].services;
        var pajakPendapatan = $scope.settings[0].pajakPendapatan;

        $.ajax({
          url: domain + ':3000/api/updateSetting',
          dataType: 'json',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            tax:tax,
            services:service,
            pajak:pajakPendapatan,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            swal({   title: "Sweet!",   text: "successfully updated"});
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }

      $scope.showHistory = function () {
        $('thead').removeClass('hidden');
        $('tbody').removeClass('hidden');

        $.ajax({
          url: domain + ':3000/api/showHistory',
          dataType: 'json',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.history.push(response.message[i]);
            }
            $scope.history.splice(0, 1);
            idx = $scope.history.length-1;
            $scope.loading = false;
          },
          error: function(xhr, status, error){
            alert(error);
            // document.location.reload();
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });
      }
      changeTitleHeader('RADICAL Setting');
    }
]);

appControllers.controller('StockDetailController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      $scope.stocks = [{}];
      var idx = 0;

      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
    				// change hi, username
            $('#username').html(data.message[0].nama);
            var nama = data.message[0].nama;
            //getPermissionByName
            $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(response){
              var str = data.message[0].permission;
              if (str.length <= 7) {
                var ct = 7-str.length;
                for (var i = 0; i < ct; i++) {
                  str += "0";
                }
              }
              else {
                str = str.substring(0, 7);
              }
              if (str.charAt(0)=="1") {
                $('#showReports').removeClass('hidden');
              }
              if (str.charAt(1)=="1") {
                $('#showMenu').removeClass('hidden');
              }
              if (str.charAt(2)=="1") {
                $('#showOrder').removeClass('hidden');
              }
              if (str.charAt(3)=="1") {
                $('#showStockDetail').removeClass('hidden');
              }
              if (str.charAt(4)=="1") {
                $('#showData').removeClass('hidden');
              }
              if (str.charAt(5)=="1") {
                $('#showExpenses').removeClass('hidden');
              }
              if (str.charAt(6)=="1") {
                $('#showSetting').removeClass('hidden');
              }
        		});
  		});

      $.ajax({
        url: domain + ':3000/api/showstok',
        dataType: 'json',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        },
        success: function(response){
          for (var i = 0; i < response.message.length; i++) {
            $scope.stocks.push(response.message[i]);
          }
          $scope.stocks.splice(0, 1);
          idx = $scope.stocks.length-1;
          $scope.loading = false;
        },
        error: function(xhr, status, error){
          alert(error);
          // document.location.reload();
        },
        complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
         //do smth if you need
        //  document.location.reload();
       }
     });

      $scope.tambah = function() {
        $scope.stocks.push({
          id: '',
          nama: '',
          jumlah: '',
          hargaTotal: 0,
          hapus: '',
        });
        idx++;
      };

      $scope.delete = function(index) {
        var id = $scope.stocks[index].id;
        $.ajax({
          url: domain + ':3000/api/deleteStok',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            id:id,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            // alert(response.message);
            swal({   title: "Sweet!",   text: response.message});
            idx--;
            document.location.reload();
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });

         //insertHistory
         $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
           $.ajax({
             url: domain + ':3000/api/insertHistory',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               namaUser:data.message[0].nama,
               perubahan:'stock',
               row:index+1,
               status:'delete',
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response);
              //  alert(obj.message);
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
              //  document.location.reload();
             },
             error: function(xhr, status, error){
               alert(error);
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
        });
      }

      $scope.update = function (index) {
        var id = $scope.stocks[index].id;
        var name = $scope.stocks[index].nama;
        var jumlah = $scope.stocks[index].jumlah;
        var hargaTotal = $scope.stocks[index].hargaTotal;

        $.ajax({
          url: domain + ':3000/api/updateStock',
          dataType: 'text',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            id:id,
            idBaru:id,
            namaBaru:name,
            jumBaru:jumlah,
            harBaru:hargaTotal,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "Berhasil mengganti nama ") {
              // alert("Data telah di Update");
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
            }
            else {
              alert(obj.message);
            }
          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
           //do smth if you need
          //  document.location.reload();
         }
       });

         //insertHistory
         $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
           $.ajax({
             url: domain + ':3000/api/insertHistory',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               namaUser:data.message[0].nama,
               perubahan:'stock',
               row:index+1,
               status:'update',
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response);
              //  alert(obj.message);
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
              //  document.location.reload();
             },
             error: function(xhr, status, error){
               alert(error);
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
        });
      }

      $scope.save = function () {
        var id = $scope.stocks[idx].id;
        var name = $scope.stocks[idx].nama;
        var jumlah = $scope.stocks[idx].jumlah;
        var hargaTotal = $scope.stocks[idx].hargaTotal;

         $.ajax({
           url: domain + ':3000/api/insertStok',
           dataType: 'text',
           method: 'POST',
           contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
           data: {
             id:id,
             nama:name,
             jumlah:jumlah,
             hargaTotal:hargaTotal,
             token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
           },
           success: function(response){
             obj = JSON.parse(response);
             if (obj.message === ("input stock berhasil dengan id "+id)) {
              //  alert(obj.message);
               swal({   title: "Sweet!",   text: obj.message});
               $('.plusbtn').removeClass('.hidden');
               document.location.reload();
             }
             else {
               alert(obj.message);
             }
           },
           error: function(xhr, status, error){
             alert(error);
           },
           complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
            //do smth if you need
           //  document.location.reload();
          }
        });

        //insertHistory
        $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          $.ajax({
            url: domain + ':3000/api/insertHistory',
            dataType: 'text',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            data: {
              namaUser:data.message[0].nama,
              perubahan:'stock',
              row:idx+1,
              status:'insert',
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
             swal({   title: "Sweet!",   text: "successfully updated"});
             document.location.reload();
             //  document.location.reload();
            },
            error: function(xhr, status, error){
              alert(error);
            },
            complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
             //do smth if you need
            //  document.location.reload();
           }
         });
       });
      }

      changeTitleHeader('RADICAL Stock Detail');
    }
]);

var x;
appControllers.controller('AspirasiController',['$scope','$http','$routeParams', function($scope,$http,$routeParams){
  $('.bars').removeClass('hidden');
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

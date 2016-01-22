var appControllers = angular.module('appControllers', []);
var domain = 'http://localhost';
var fullMonths = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

appControllers.controller('UserController',['$scope','$http',
    function($scope,$http){
      $('.bars').removeClass('hidden');
      changeTitleHeader('User');
      $.get('http://localhost:3000/api/user?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&status=online').success(function(data){
          //change hi, username
          $('#username').html(data.message[0].nama);
          var nama = data.message[0].nama;
          //getPermissionByName
          $.get('http://localhost:3000/api/showPermission?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ&nama='+nama).success(function(responses){
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

            $.ajax({
              url: domain + ':3000/api/userProfile',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                username: data.message[0].nama,
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
              },
              success: function(response){
                obj = JSON.parse(response);
                $(".username").text(obj.message[0].nama);
                $(".role").text(obj.message[0].role);
              },
              error: function(xhr, status, error){
                alert(error);
              },
              complete: function(){
             }
           });
          });

          $scope.delete = function(index) {
            $.ajax({
              url: domain + ':3000/api/deleteUser',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                nama: data.message[0].nama,
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
              },
              success: function(response){
                // alert(response);
                document.location.assign('http://localhost:8080/arthentic/#/login');
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
]);

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
       var hargaProduksi = $scope.menu[index].hargaProduksi;
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
           hargaProduksi:hargaProduksi,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           obj = JSON.parse(response);
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
      //setmenuready
      var querry = "http://localhost:3000/api/setMenuReady?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+id;
      $.get(querry).success(function(data){
        if (data.message == "sukses") {
          swal("Done!", "Menu Updated.", "success");
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
       var hargaProduksi = $scope.menu[idx].hargaProduksi;
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
            hargaProduksi:hargaProduksi,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            // if (obj.message === "input menu berhasil dengan nama "+name) {
            //   // alert(obj.message);
            //   swal("Good job!", obj.message, "success");
            //   // document.location.reload();
            //   $('#btnplus').removeClass('hidden');
            // }
            // else {
            //   // alert("input tidak boleh kosong");
            //   swal({   title: "Alert!",   text: "input tidak boleh kosong.",   timer: 2000,   showConfirmButton: false });
            // }
            alert(obj.message);
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
        var passcode = $scope.form.passcode;

        // alert(passcode);
        if(passcode == 'dstrvntr'){
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
        }else{
          alert('YOU ARE NOT THE OWNER');
        }
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

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var hours = today.getHours();
      var minutes = today.getMinutes();
      var seconds = today.getSeconds();
      today = months[mm-1]+' '+dd+', '+yyyy+'\n';
      var times = hours+':'+minutes+':'+seconds;
      $(".todaysdateinv").text(today+times);

      $http.get('http://localhost:3000/api/invoices?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ').success(function(data){
          $scope.invoice = data.message;
  				$scope.loading = false;
  		});

      $scope.deleteInvoice = function () {
        $http.get('http://localhost:3000/api/deleteInvoices?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
            swal("Good job!", data.message, "success");
    				$scope.loading = false;
    		});
        document.location.reload();
      }

      $scope.getCash = function () {
        var cash = $scope.invoice[0].paid;
        return cash;
      }

      $scope.printInvoice = function () {
       var printButton = document.getElementById("printButton");
       var deleteButton = document.getElementById("deleteButton");
       printButton.style.visibility = 'hidden';
       deleteButton.style.visibility = 'hidden';
       $window.print();
       printButton.style.visibility = 'visible';
       deleteButton.style.visibility = 'visible';
      //  $http.get('http://localhost:3000/api/deleteInvoices?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ').success(function(data){
      //      swal("Good job!", data.message, "success");
      //      $scope.loading = false;
      //  });
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

      $scope.clear = function () {
        var length = $scope.dailys.length;
        $scope.dailys.splice(0, length);
      }

      // $scope.total = function (idx) {
      //   var price = $scope.dailys[idx].HargaAkhir;
      //   // var quantity = $scope.dailys[idx].Quantity;
      //
      //   $scope.dailys[idx].total = price;
      // }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.dailys, function (daily) {
           resultHT += daily.HargaAkhir;
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

      $scope.clear = function () {
        var length = $scope.weekly.length;
        $scope.weekly.splice(0, length);
      }

      $scope.total = function (idx) {
        var price = $scope.weekly[idx].HargaAkhir;
        var quantity = $scope.weekly[idx].Quantity;

        $scope.weekly[idx].total = price*quantity;
      }

      $scope.SubTotal = function () {
        var resultHT =0;

         angular.forEach($scope.weekly, function (week) {
           resultHT += week.HargaAkhir;
         });

        return resultHT;
      }

      $scope.proceed = function () {
        var result = [{}];

        $('.bars').removeClass('hidden');
        var startdate = $scope.input.startdate;
        var enddate = $scope.input.enddate;
        // split startdate
        var tempS = startdate.split("/");
        startdate = tempS[2]+"/"+tempS[0]+"/"+tempS[1];

        // split enddate
        var tempE = enddate.split("/");
        enddate = tempE[2]+"/"+tempE[0]+"/"+(Number(tempE[1]));

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
            var ct = 0;

            for (var i = 0; i < response.message.length; i++) {
              result.push(response.message[i]);
            }
            for (var i = 0; i < response.message.length; i++) {
              // alert(result[i].Date+", "+res[i].HargaAkhir);
              var tempDate = response.message[i].Date.split("T");
              var temptanggal = tempDate[0].split("-");
              var temphari = temptanggal[2];
              var tempbulan = temptanggal[1];
              var temptahun = temptanggal[0];
              var hari = Number(temphari)+1;
              var tanggal = temptahun+"/"+tempbulan+"/"+hari;
              if (result[ct] == undefined || tanggal != result[ct].Date) {
                ct++;
                // result[ct].Date = response.message[i].Date;
                result[ct].Date = tanggal;
                result[ct].HargaAkhir = response.message[i].HargaAkhir;
              }
              else {
                result[ct].HargaAkhir -= -response.message[i].HargaAkhir;
              }
            }
            for (var i = 0; i <= ct; i++) {
              $scope.weekly.push(result[i]);
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

      $scope.clear = function () {
        var incomeslength = $scope.incomes.length;
        var expslength = $scope.exps.length;

        $scope.incomes.splice(0, incomeslength);
        $scope.exps.splice(0, expslength);
      }

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
           resultHT += income.HargaAkhir;
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
        // alert("bulan = "+mmMon+" year= "+yyMon);
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
              // alert("haha = "+$scope.incomes);
            }
            $scope.loading = false;
            // alert("haha = "+response.message[0]);
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
           if (bulanexp.length == 1) {
             bulanexp = "0"+bulanexp;
           }

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

      $scope.clear = function () {
        var explength = $scope.expensesReports.length;
        $scope.expensesReports.splice(0, explength);
      }

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
            bulan:mmExpenses,
            tahun:yyExpenses,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            for (var i = 0; i < response.message.length; i++) {
              $scope.expensesReports.push(response.message[i]);
            }
            // $scope.expensesReports.splice(0, 1);
            idx = $scope.expensesReports.length-1;
            $scope.loading = true;
            // alert("bulan ="+mmExpenses +" tahun= "+yyExpenses);
            // alert(response.message.length);
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

      $scope.inputmenu = function (idx) {
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
            var name = response.message[0].nama
            var harga = Number(response.message[0].harga)

            $scope.articles[idx].price = harga;
            $scope.articles[idx].titre = name;

            // if (name == 'menu habis/tidak ada') {
            //   $scope.articles[idx].titre = name;
            //   $scope.articles[idx].price = 0;
            // }else{
            //   $scope.articles[idx].price = harga;
            //   $scope.articles[idx].titre = name;
            // }
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

     addRow = function () {
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
     }

    $scope.tambah = function() {
      var idmenu = $scope.articles[i].reference;
      var quantity = $scope.articles[i].quantity;

      var querry = "http://localhost:3000/api/showMenuById?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+idmenu;
      $.get(querry).success(function(data){
        var composition = data.message[0].komposisi;
        // var hargaProduksi = data.message[0].hargaProduksi;
        var res = composition.split(",");
        var counter = 0;
        for (var i = 0; i < res.length; i++) {
          var stock = res[i].split(" ");
          var namaStock = stock[0];
          var jumlahStock = stock[1];
          var value = jumlahStock*quantity;
          //http://localhost:3000/api/cekStok?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&nama=diamond-milk&nilai=10000
          var querry2 = "http://localhost:3000/api/cekStok?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&nama="+namaStock+"&nilai="+value;
          $.get(querry2).success(function (data) {
            // alert(data.message);
            if (data.message == "stok di atas reorder stok") {
              counter++;
            }
            else {
              swal({   title: "Stok tidak cukup untuk menu ini",   text: data.message});
            }
            if (counter == res.length) {
              addRow();
            }
          });
        }
      });
    };

     $scope.delete = function(index) {
       $scope.articles.splice(index, 1);
       i--;
     }

     insertOrderToDb = function () {
       for (var i = 0; i < $scope.articles.length; i++) {
          var idorder = $scope.articles[i].id;
          var idmenu = $scope.articles[i].reference;
          var menuname = $scope.articles[i].titre;
          var price = $scope.articles[i].price;
          var quantity = $scope.articles[i].quantity;
          var discount = $scope.articles[i].discount;
          var total = $scope.articles[i].total;

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
              hargaTotal:(price*quantity)-(price*quantity*(discount/100)),
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
            },
            success: function(response){
              obj = JSON.parse(response);
             //  alert(obj.message);
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

     kurangStokfunction = function () {
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
            //setmenuready
            var querry = "http://localhost:3000/api/setMenuReady?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+idmenu;
            $.get(querry).success(function(data){
              if (data.message == "sukses") {
                var nextQuerry = "http://localhost:3000/api/setMenuEmpty?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+idmenu;
                $.get(nextQuerry).success(function(data){
                  // alert(data.message);
                  if (data.message == "done") {
                    swal("Done!", "Order have been Saved.", "success");
                  }
                });
              }
            });

          },
          error: function(xhr, status, error){
            alert(error);
          },
          complete: function(){
         }
       });
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
            var hargaProduksii = data.message[0].hargaProduksi;
            var res = composition.split(",");
            var counter = 0;

            for (var i = 0; i < res.length; i++) {
              var stock = res[i].split(" ");
              var namaStock = stock[0];
              var jumlahStock = stock[1];
              // var jumlahProduksi = Number(data.message[0].hargaProduksi)*quantity;
              // alert(data.message[0].hargaProduksi);
              var total = jumlahStock*quantity;

              var querry2 = "http://localhost:3000/api/cekStok?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&nama="+namaStock+"&nilai="+total;
              $.get(querry2).success(function (data) {
                if (data.message == "stok di atas reorder stok") {
                  counter++;
                }
                else {
                  swal({   title: "Stok tidak cukup untuk menu ini",   text: data.message});
                }
                if (counter == res.length) {
                  insertOrderToDb();
                  kurangStokfunction();
                }
              });
           }
     		});
       }
      //  insertOrderToDb();
     }

     $scope.print = function () {
       var paid = $scope.article.paid;
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
             paid:paid,
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

appControllers.controller('TodaysOrderController',['$scope','$http',
    function($scope,$http){

      $scope.dailys = [{}];
      //getDate
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy+'/'+mm+'/'+dd;

      $.ajax({
        url: domain + ':3000/api/hitungHarian',
        dataType: 'JSON',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          date: today,
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

    //  $scope.total = function (idx) {
    //    var price = $scope.dailys[idx].HargaAkhir;
    //   //  var quantity = $scope.dailys[idx].Quantity;
    //   //  alert(price*quantity);
    //    $scope.dailys[idx].total = Number(price);
    //  }

     $scope.SubTotal = function () {
       var resultHT =0;

        angular.forEach($scope.dailys, function (daily) {
          resultHT += daily.HargaAkhir;
        });

       return resultHT;
     }

     $scope.delete = function(index) {
       var idmenu = $scope.dailys[index].Id;
       var quantity = $scope.dailys[index].Quantity;
       var hargaAkhir = $scope.dailys[index].HargaAkhir;

      //  alert(idmenu);
      var querry = "http://localhost:3000/api/showMenuById?token=eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ&id="+idmenu;
      $.get(querry).success(function(data){
        var composition = data.message[0].komposisi;
        var hargaProduksii = data.message[0].hargaProduksi;
        var res = composition.split(",");

        for (var i = 0; i < res.length; i++) {
          var stock = res[i].split(" ");
          var namaStock = stock[0];
          var jumlahStock = stock[1];
          // var jumlahProduksi = Number(data.message[0].hargaProduksi)*quantity;
          // alert(data.message[0].hargaProduksi);
          var total = jumlahStock*quantity;
           $.ajax({
             url: domain + ':3000/api/tambahStoks',
             dataType: 'text',
             method: 'POST',
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
             data: {
               nama:namaStock,
               jumPenambahan:total,
               token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
             },
             success: function(response){
               obj = JSON.parse(response);
               swal({   title: "Deleted!",   text: "successfully updated "+obj.message});
             },
             error: function(xhr, status, error){
               alert(error);
             },
             complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
              //do smth if you need
             //  document.location.reload();
            }
          });
        }
      });

      // alert(idmenu+", "+hargaAkhir+", "+today);
      $.ajax({
        url: domain + ':3000/api/deleteOrder',
        dataType: 'text',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          id:idmenu,
          HargaAkhir:hargaAkhir,
          Date:today,
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
        },
        success: function(response){
          obj = JSON.parse(response);
          swal({   title: "Deleted!",   text: "successfully updated "+obj.message});
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
    }

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
      changeTitleHeader('RADICAL TODAYS ORDER');
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
          satuan: '',
          hargaTotal: 0,
          hapus: '',
          reorder:'',
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
        var satuan = $scope.stocks[index].satuan;
        var hargaTotal = $scope.stocks[index].hargaTotal;
        var reorder = $scope.stocks[index].reorder;

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
            satuanBaru:satuan,
            harBaru:hargaTotal,
            reorderBaru:reorder,
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
          },
          success: function(response){
            obj = JSON.parse(response);
            if (obj.message === "Berhasil mengganti nama ") {
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
            }
            else {
            }
          },
          error: function(xhr, status, error){
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
           nama:name,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
         },
         error: function(xhr, status, error){
         },
         complete: function(){
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
              swal({   title: "Sweet!",   text: "successfully updated"});
              document.location.reload();
              //  document.location.reload();
             },
             error: function(xhr, status, error){
              //  alert(error);
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
        //new
        var satuan = $scope.stocks[idx].satuan;
        var reorder = $scope.stocks[idx].reorder;
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
             satuan:satuan,
             hargaTotal:hargaTotal,
             reorder:reorder,
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
            //  alert(error);
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
              // alert(error);
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

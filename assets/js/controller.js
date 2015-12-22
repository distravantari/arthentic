var appControllers = angular.module('appControllers', []);
var domain = 'http://localhost';
var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

appControllers.controller('MenuController',['$scope','$http',
    function($scope,$http){

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
           alert(obj.message);
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
              alert(obj.message);
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
          $scope.menu.splice(index, 1);
         },
         error: function(xhr, status, error){
           alert(error);
         },
         complete: function(){ //A function to be called when the request finishes (after success and error callbacks are executed) - from jquery docs
          //do smth if you need
         //  document.location.reload();
        }
      });
     };

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
            if (obj.mesage === "Nama atau password salah") {
              alert(obj.mesage);
            }
            else {
              window.location.assign(domain+":8080/arthentic/#/dashboard");
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

      changeTitleHeader('RADICAL LOGIN');
    }
]);

appControllers.controller('RegisterController',['$scope','$http',
    function($scope,$http){
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

appControllers.controller('InvoiceController',['$scope','$http',
    function($scope,$http){
      changeTitleHeader('Invoice');
    }
]);

appControllers.controller('DashboardController',['$scope','$http',
    function($scope,$http){
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
      changeTitleHeader('Daily Reports');
      $scope.dailys = [{}];

      $scope.proceed = function () {
        var tanggal = $scope.input.tanggal;

        $.ajax({
          url: domain + ':3000/api/hitungHarian',
          dataType: 'JSON',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
          data: {
            tanggal: tanggal,
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
    }
]);

appControllers.controller('WeeklyReportsController',['$scope','$http',
    function($scope,$http){
      changeTitleHeader('Weekly Reports');
    }
]);

appControllers.controller('MonthlyReportsController',['$scope','$http',
    function($scope,$http){
      changeTitleHeader('Monthly Reports');
    }
]);

appControllers.controller('OrderController',['$scope','$http',
    function($scope,$http){

      $scope.articles = [{}];
      var i = 0;
      var counter=1;

      //getDate
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy+'/'+mm+'/'+dd;
      $(".todaysdate").text(today);

      $scope.getMenuById = function () {
        // alert(i);
        var idmenu = $scope.articles[i].reference;

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
            var harga = Number(response.message[0].harga)
            $scope.articles[i].price = harga;
            $scope.articles[i].titre = response.message[0].nama;
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

      $scope.confirm = function(){
        var idorder = $scope.articles[i].id;
        var idmenu = $scope.articles[i].reference;
        var menuname = $scope.articles[i].titre;
        var price = $scope.articles[i].price;
        var quantity = $scope.articles[i].quantity;
        var discount = $scope.articles[i].discount;

        var total = (Number(price)*Number(quantity))-(Number(discount/100)*(Number(price)*Number(quantity)));
        $scope.articles[i].total=total;
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
        id: 1,
        reference: '',
        titre: '',
        price: 0,
        quantity: 0,
        discount: 0,
        total:0
      });
      $('#btnplus').addClass('hidden');
    };

     $scope.delete = function(index) {
       var id = $scope.articles[index].id;
       var idmenu = $scope.articles[index].reference;

       $.ajax({
         url: domain + ':3000/api/deleteOrder',
         dataType: 'text',
         method: 'POST',
         contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
         data: {
           nomerorder:id,
           id:idmenu,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           obj = JSON.parse(response)
           alert(obj.message);
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
       $scope.articles.splice(index, 1);
       i--;
     };

     $scope.save = function () {
       $('#btnplus').removeClass('hidden');
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
           id:idmenu,
           date:today,
           pesanan:menuname,
           quantity:quantity,
           diskon:discount,
           hargaSatuan:price,
           hargaAkhir:total,
           nomororder:idorder,
           token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTA2NTYyNDh9.Ea_JD2LROIyqk14xO_eQw_JE2VnxgZOV5GoWF-E2OSQ'
         },
         success: function(response){
           obj = JSON.parse(response)
           alert(obj.message);
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

     $scope.print = function () {
       document.location.assign(domain+':8080/arthentic/#/invoice');
     }

      changeTitleHeader('RADICAL Order');
    }
]);

appControllers.controller('EmployeesDataController',['$scope','$http',
    function($scope,$http){
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
            alert(response.message);
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
      };

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
              alert(obj.message);
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
               alert(obj.message);
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
      }

      changeTitleHeader('RADICAL Employees Data');
    }
]);

appControllers.controller('SupplierDataController',['$scope','$http',
    function($scope,$http){
      $scope.suppliers = [{}];
      var idx = 0;

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
             alert(response.message);
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
       };

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
               alert(obj.message);
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
                alert(obj.message);
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
       }

      changeTitleHeader('RADICAL Supplier Data');
    }
]);

appControllers.controller('MemberDataController',['$scope','$http',
    function($scope,$http){
      $scope.members = [{}];
      var idx = 0;

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
           alert(response.message);
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
             alert(obj.message);
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
     }
    changeTitleHeader('RADICAL Data Member');
    }
]);

appControllers.controller('StockDetailController',['$scope','$http',
    function($scope,$http){
      $scope.stocks = [{}];
      var idx = 0;

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
            alert(response.message);
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
      };

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
              alert("Data telah di Update");
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
               alert(obj.message);
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
      }

      changeTitleHeader('RADICAL Stock Detail');
    }
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

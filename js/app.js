/**
 * Created by hxsd on 2016/11/23.
 */
angular.module("cartService",[]);

// 创建一个主模块
var myapp = angular.module("myapp",["ionic","cartService"]);
myapp.controller("myCtrl",function($scope,$http){
    var url="data.json";
    $http.get(url)
        .success(function(data){
            console.log(data)
        })
});


// 配置路由
myapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state("tour",{
            url:"/tour",
            templateUrl:"templates/tour/tour.html",
        })
        .state("home",{
            url:"/home",
            templateUrl:"templates/home/home.html",
            controller:"homeCtrl"
        })
        .state("tabs",{
            url:"/tabs",
            abstract:true,
            templateUrl:"templates/tabs/tabs.html"
        })
        .state("tabs.LowPrice",{
            url:"/LowPrice",
            views:{
                "tabs-LowPrice":{
                    templateUrl:"templates/lowPrice/LowPrice.html",
                    controller:"LowPriceCtrl"
                }
            }
        })
        .state("tabs.writer",{
            url:"/writer",
            views:{
                "tabs-writer":{
                    templateUrl:"templates/writer/writer.html"
                }
            }
        })
        .state("tabs.category",{
            url:"/category",
            views:{"tabs-category":{
                templateUrl:"templates/category/category.html",
                controller: "categoryCtrl"
            }}
        })
        .state("myCart", {
            url:"/myCart",
            templateUrl: "templates/myCart/myCart.html",
            controller:"myCartCtrl"
        })
        .state("writerDetail", {
            url:"/writerDetail",
            templateUrl: "templates/writer/writerDetail.html",
            controller:"LowPriceCtrl"
        })
        .state("categoryDetail", {
            url: "/categoryDetail?:category", // 路由传参
            templateUrl: "templates/category/categoryDetail.html",
            controller: "categoryDetailCtrl"
        })
        .state("detail", {
            url: "/detail?:title:category", // 路由传参
            templateUrl: "templates/detail/detail.html",
            controller: "detailCtrl"
        })
        .state("success", {
            url: "/success", // 路由传参
            templateUrl: "templates/success/success.html",
        })
        .state("checkout", {
            url:"/myOrder",
            templateUrl: "templates/myOrder/myOrder.html",
            controller: "myCartCtrl"
        });
    // 如果以上路由都不匹配，使用这个备选方案
    $urlRouterProvider.otherwise("/tour");
});

// $q 是内置服务，所以可以直接使用
// 创建一个Service，它负责从服务器请求商品数据，并全局共享
myapp.factory("dataFactory", function ($http, $q) {
    return {
        query: function () {
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
            $http.get("data.json")
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                })
                .error(function (data, status, headers, config) {
                    deferred.reject(data);   // 声明执行失败，即服务器返回错误
                });
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
        } // end query
    };
});

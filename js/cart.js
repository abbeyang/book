/**
 * Created by hxsd on 2016/12/6.
 */
angular.module("myapp").controller("cartCtrl",function($scope,cartShop,$http,$location,$state,$ionicViewSwitcher,$ionicHistory){
    // 首先拿到购物车中的所有商品
    var cartDate = cartShop.findAll();
    // 计算所有商品的部数量
    $scope.totalNumber = function(){
        var total = 0;
        angular.forEach(cartDate,function(item){
            total += item.number;
        });
        return total;
    };
    $scope.toDetail = function(book){

        $state.go("detail",{title:book.title,category:"suggest"});

        // 将go有动画效果
        $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
    };

    // 计算所有商品的总金额
    $scope.totalMoney = function(){
        var total = 0;
        angular.forEach(cartDate,function(item){
            total += item.number * item.product.price;
        });
        return total;
    };
    $scope.sendOrder = function(){

        // 首先，准备提交给服务器端的数据: 1) 购物车中的商品数据；2) 收货人信息;
        var orderData = {};
        orderData.cartData = cartShop.findAll();    // 购物车中的商品数据
        orderData.shipping = angular.copy($scope.shipping); // 收货人信息

        // 使用$http service将数据发送给服务器端，并处理服务器端的响应
        // GET/POST方法，这里选POST
        $http.post("order.json",orderData)
            .success(function(data){  // data是服务器端发回的响应信息：订单号
                // 将订单号存储到$scope中，到thankYou页面中显示订单号

                $scope.orderId = data.orderId;
                // 一定要记得清空购物车
                cartShop.clear();
            })
            .error(function(data,status){   // status: 状态码,比如404
                // 将错误状态码存储到$scope中，到thankYou页面中显示错误信息
                $scope.data.errorStatus = status;
            })
            .finally(function(){
                // 不管请求是不成功，finally方法一定会得到执行
                // 最终都要跳转到thankYou.html页面
                $location.path("/success");
            });
    };
    $scope.goBack=function(){
        $ionicHistory.goBack();
        $ionicViewSwitcher.nextDirection("back")
    }
});
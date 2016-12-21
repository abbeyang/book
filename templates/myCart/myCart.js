/**
 * Created by hxsd on 2016/12/6.
 */
angular.module("myapp").controller("myCartCtrl",function($scope,cartShop){
    // 首先获取购物车中已经添加的所有商品
    $scope.cart = cartShop.findAll();
    $scope.remove=function(book){
        cartShop.remove(book);
    };
    //console.log($scope.cart.length);
    // 计算购物车中所有商品的总金额console.log(cart.length)
    $scope.summary = function(){
        var total = 0;
        angular.forEach($scope.cart,function(item){
            total += item.number * item.product.price;
        });
        return total;
    };

});
/**
 * Created by hxsd on 2016/12/9.
 */
angular.module("myapp")
    .controller("categoryDetailCtrl", function ($scope, $stateParams, dataFactory,cartShop,$ionicHistory,$ionicViewSwitcher) {
        // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
        var category = $stateParams.category;

        // 查询出来要显示在view中的商品数据
        var promise = dataFactory.query();

        promise.then(function(data){
            $scope.category=category;
            $scope.book = data;
            console.log(category)
        });
        $scope.add = function(book){
            // 调用购物车对象的add方法
            cartShop.add(book);
        };
    });
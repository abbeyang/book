/**
 * Created by yj on 2016/11/27.
 */
angular.module("myapp")
    .controller("LowPriceCtrl", function ($scope,$state,$ionicViewSwitcher,dataFactory) {
        // 查询出来要显示在view中的商品数据
        //$scope.data = dataFactory.query();
        //$scope.books=$scope.data.productList;
        var promise=dataFactory.query();
        promise.then(function(data){
            $scope.books=data;
        })
    });
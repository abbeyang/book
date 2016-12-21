/**
 * Created by hxsd on 2016/12/9.
 */
angular.module("myapp")
    .controller("categoryCtrl", function ($scope,$state,$ionicViewSwitcher,dataFactory) {
        // 查询出来要显示在view中的商品数据
        //$scope.data = dataFactory.query();
        //$scope.books=$scope.data.productList;
        var promise=dataFactory.query();
        promise.then(function(data){
            $scope.books=data;
        })
        $scope.toCategory = function(category){
            $state.go("categoryDetail",{category:category});
            // 将go有动画效果
            $ionicViewSwitcher.nextDirection("forward");    // "forward","back"
        };
    });
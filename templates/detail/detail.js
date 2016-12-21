/**
 * Created by hxsd on 2016/9/1.
 */
angular.module("myapp")
    .controller("detailCtrl", function ($scope, $stateParams, dataFactory,cartShop) {
        // 解析url中的参数(通过url传递的参数，解析出来都是字符串)
        var title = $stateParams.title;

        // 查询出来要显示在view中的商品数据
        var promise = dataFactory.query();

        promise.then(function(data){
            angular.forEach(data, function (item) {
                if (item.title == title) {
                    $scope.book = item;
                    return false;   // 中断forEach循环 <=> break
                }
            });
        });
        $scope.add = function(book){
            // 调用购物车对象的add方法
            cartShop.add(book);

        };

    });
var app = angular.module('app', [])
app.controller('ctrl', function ($scope, $http) {
    $scope.new = {};
    $scope.fetch = [];
    $scope.home = function (val) {
        $http({
            method: 'post',
            url: '/homes',
            data: val
        }).then(function (success) {
            console.log(success)
            $scope.fetch.push(val);
            $scope.new = {};
            location.reload();
        }, function (error) {
            alert(error);
        })
    }

    $scope.getfetch = function () {
        $http({
            method: 'get',
            url: '/gethome'
        }).then(function (success) {
            // console.log(success.data)
            $scope.fetch = success.data;
        }, function (error) {
            alert(error)
        })
    }

    $scope.status=function (val) {
        $http({
            method:'post',
            url:'/statusprocess',
            data:val
        }).then(function (success) {
            console.log(success)
            location.reload();
        },function (error) {
            alert(error)
        })
    }
})
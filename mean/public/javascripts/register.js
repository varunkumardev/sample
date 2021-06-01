var app = angular.module('aditya', [])
app.controller('myctrl', function ($scope, $http) {
    $scope.user = {};
    $scope.postdata = function (val) {
        console.log(val)

        $http({
            method: 'post',
            // method:'get',
            // method:'delete',
            // method:'update',
            url: '/varun',
            data: val
        }).then(function (success) {
            console.log(success)
        }, function (error) {
            alert(error)
        })

    }
})
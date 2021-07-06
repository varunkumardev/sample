var app = angular.module('myapp', [])
app.controller('mycntrl', function ($scope, $http) {
    $scope.forget = {};
    $scope.hide = false;
    $scope.pass = false;
    $scope.otp = true;

    $scope.checkmail = function (value) {
        $http({
            method: 'post',
            url: '/check',
            data: value
        }).then(function (success) {
            console.log(success)
            $scope.hide = true;
        }, function (error) {
            alert('Enter a Valid Mail Id');
        })
    }

    $scope.verifyotp = function (value) {
        $http({
            method: 'post',
            url: '/compare',
            data: value
        }).then(function (success) {
            alert('otp matched')
            console.log(success)
            $scope.otp = false;
            $scope.pass = true;
            $scope.hide = false;
        }, function (error) {
            alert('otp not matched')
        })
    }

    $scope.password = function (value) {
        if (value.pass != value.cpass) {
            alert('password and confirm password not matched')
        } else if (value.pass == null && value.cpass == null) {
            alert('Enter the Password')
        } else {
            $http({
                method: 'post',
                url: '/cpass',
                data: value
            }).then(function (success) {
                alert('Password changed')
                console.log(success)
            }, function (error) {
                alert('Password not changed')
            })
        }
    }
})
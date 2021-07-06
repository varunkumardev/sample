var app = angular.module('myapp', [])
app.controller('myctrl', function ($scope, $http) {
    $scope.user = {};
    $scope.userdata = [];


    $scope.postdata = function (val) {

        // validation and post
        if (val.First_Name == null || val.Last_Name == null || val.Surname == null || val.Gender == null || val.Email == undefined || val.Phone_Number == null || val.Password == undefined || val.Confirm_Password == null) {
            alert("Fill The Empty Fields");
        } else if (val.Password != val.Confirm_Password) {
            alert("password does not match")
        } else {
            console.log(val);
            $http({
                method: 'post',
                url: '/inform',
                data: val
            }).then(function (success) {
                console.log(success)
                $scope.user = {};
                $scope.userdata.push(val);
                window.location.href = '/fetch'
            }, function (error) {
                alert('already exists')
            })
        }
    }

    //getdata
    $scope.getdata = function () {
        $http({
            method: 'get',
            url: '/getdata'
        }).then(function (success) {
            console.log(success.data)
            $scope.userdata = success.data;
        }, function (error) {
            console.log(error);
        })
    }

    //delete
    $scope.delete = function (val, index) {
        $scope.userdata.splice(index, 1)
        $http({
            method: 'post',
            url: '/remove',
            data: val
        }).then(function (success) {
            console.log(success)
        }, function (error) {
            console.log(error);
        })
    }

    //login
    $scope.log = {};
    $scope.login = function (val) {
        console.log(val)
        $http({
            method: 'post',
            url: '/login',
            data: val
        }).then(function (success) {
            console.log(success)
            window.location.href = '/homepage'
        }, function (error) {
            alert('Username and password are not exist')
        })
    }

})
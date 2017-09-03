angular
    .module('myApp')
    .controller('loginCtrl', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
        $scope.userTable = [{
            email: 'admin@address.com',
            password: 'admin',
            type: 'admin'
        }, {
            email: 'user1@address.com',
            password: 'user1',
            type: 'user'
        }, {
            email: 'user2@address.com',
            password: 'user2',
            type: 'user'
        }, {
            email: 'user3@address.com',
            password: 'user3',
            type: 'user'
        }];
        $scope.login = true;
        $scope.showToggle = function() {
            $scope.login = !$scope.login;
        }
        $scope.activUser = {};
        $scope.checkLogin = function() {
            $scope.activUser = LocalStorageService.get("currentUser");
            //console.log("$scope.activUser: ", $scope.activUser);
            if ($scope.activUser != undefined) {
                for (var i = 0; i < $scope.userTable.length; i++) {
                    if ($scope.userTable[i].email == $scope.activUser.email) {
                        if ($scope.userTable[i].password == $scope.activUser.password) {
                            if ($scope.activUser.type == 'admin') {
                                window.location.href = "views/admin/index.html";
                            } else if ($scope.activUser.type == 'user') {
                                window.location.href = "views/front/index.html";
                            } else {
                                LocalStorageService.delete("currentUser");
                                window.location.href = "index.html";
                            }
                        } else {
                            LocalStorageService.delete("currentUser");
                            window.location.href = "index.html";
                        }
                    }
                }
            } else {
                LocalStorageService.delete("currentUser");
            }
        }

        $scope.checkLogin();
        $scope.loginUser = function(userdata) {
            console.log("Here/ ", userdata);
            for (var i = 0; i < $scope.userTable.length; i++) {
                console.log("I/ ", i, ": ", $scope.userTable[i].email, "==", userdata.email, "THEN:", $scope.userTable[i].email == userdata.email)
                if ($scope.userTable[i].email == userdata.email) {
                    console.log("I101/ ", i, ": ", $scope.userTable[i].password, "==", userdata.password, "THEN:", $scope.userTable[i].email == userdata.email)
                    if ($scope.userTable[i].password == userdata.password) {
                        if ($scope.userTable[i].type == 'admin') {
                            userdata.type = 'admin';
                            LocalStorageService.put("currentUser", userdata)
                            window.location.href = "views/admin/index.html";
                        } else if ($scope.userTable[i].type == 'user') {
                            userdata.type = 'user';
                            LocalStorageService.put("currentUser", userdata);
                            window.location.href = "views/front/index.html";
                        } else
                            alert("An error has occured, please report the problem to the admin!");
                        break;
                    } else
                        alert("Wrong Username or Password!");
                }
                //In case the user doesn't exist on the userTable, the costumer is alerted that they have entered wrong credentials
                else if (i == $scope.userTable.length - 1 && $scope.userTable[i].email != userdata.email)
                    alert("Wrong Username or Password!");
            }
        }
    }]);
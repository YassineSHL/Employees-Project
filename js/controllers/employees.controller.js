angular
    .module('myApp')
    .controller('employeesCtrl', ['$scope', 'LocalStorageService', '$uibModal', '$log', '$location', '_', function($scope, LocalStorageService, $uibModal, $log, $location, _) {
        $scope.activUser = {};
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

        $scope.logout = function() {
            LocalStorageService.delete("currentUser");
            window.location.href = "index.html";
        }

        $scope.checkLogin = function() {
            $scope.activUser = LocalStorageService.get("currentUser");
            var val = -1;
            for (var i = 0; i < $scope.userTable.length; i++) {
                if ($scope.userTable[i].email == $scope.activUser.email) {
                    if ($scope.userTable[i].password == $scope.activUser.password) {
                        val = i;
                    } else
                        continue;
                }
            }
            if (val == -1) {
                $scope.logout();
            }
        }
        $scope.checkLogin();

        $scope.employee = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            address: '',
            city: '',
            insuranceNumber: '',
            insuranceExpiryDate: '',
            profession: '',
            company: ''
        };

        var original = $scope.employee;
        $scope.employees = [{
            id: 0,
            firstName: 'Anja',
            lastName: 'Milovic',
            email: 'Anja@Milovic.org',
            phoneNumber: '015151718818',
            address: 'Holder Street 78',
            city: 'New york',
            insuranceNumber: '7845148596',
            insuranceExpiryDate: '02-12-2021',
            profession: 'Web Developer',
            company: 'X-Revolution GmbH',
            image: 'anja.jpeg'
        }, {
            id: 1,
            firstName: 'Thomas',
            lastName: 'Kiel',
            email: 'Thomas@Kiel.com',
            phoneNumber: '015171122222',
            address: 'Alexander Platz 51',
            city: 'Berlin',
            insuranceNumber: '8574896102',
            insuranceExpiryDate: '05-05-2020',
            profession: 'Werkstudent',
            company: 'XING GmbH',
            image: 'thomas.jpeg'
        }, {
            id: 2,
            firstName: 'Kyle',
            lastName: 'Merlyn',
            email: 'Kyle@Merlyn.org',
            phoneNumber: '016252532151',
            address: 'Chiyo Nay 4',
            city: 'Shaghai',
            insuranceNumber: '0441184875',
            insuranceExpiryDate: '31-08-2025',
            profession: 'Consultant',
            company: 'Metros AG',
            image: 'kyle.jpeg'
        }, {
            id: 3,
            firstName: 'Sebil',
            lastName: 'Derean',
            email: 'Sebil@Derean.org',
            phoneNumber: '014151664531',
            address: 'Balkan Avenue 12',
            city: 'Sao Paolo',
            insuranceNumber: '7564025651',
            insuranceExpiryDate: '01-12-2023',
            profession: 'HR Team Leader',
            company: 'Fartas Co',
            image: 'sebil.jpeg'
        }, {
            id: 4,
            firstName: 'Sara',
            lastName: 'Feres',
            email: 'Sara@Feres.org',
            phoneNumber: '014754858868',
            address: 'Mailands Street 108A',
            city: 'Warsaw',
            insuranceNumber: '4458625264',
            insuranceExpiryDate: '01-01-2020',
            profession: 'Web Application Developer',
            company: 'E-Typo GmbH',
            image: 'sara.jpeg'
        }];



        $scope.editMode = false;
        $scope.showCred = false;
        $scope.showCredential = [];
        $scope.oldEntry = [];
        var indexEditEntry = '';

        var initEmployee = function() {
            $scope.employee.firstName = '';
            $scope.employee.lastName = '';
            $scope.employee.email = '';
            $scope.employee.phoneNumber = '';
            $scope.employee.address = '';
            $scope.employee.city = '';
            $scope.employee.insuranceNumber = '';
            $scope.employee.insuranceExpiryDate = '';
            $scope.employee.profession = '';
            $scope.employee.company = '';
        };

        //EMPLOYEES FACTORY
        $scope.deleteEntry = function(employee) {
            console.log("employee: ", employee);
            var index = 0;
            for (var i = 0; i < $scope.employees.length; i++) {
                if ($scope.employees[i].id == employee.id) {
                    $scope.employees.splice(i, 1);
                } else {
                    continue;
                }
            };
            $scope.employee = '';
            initEmployee();
            console.log('Employee Deleted', $scope.employees);
        };

        $scope.editEntry = function(employee) {
            $scope.editMode = true;
            // indexEditEntry = id;
            $scope.employee = JSON.parse(JSON.stringify(employee));
            console.log('Employee to edit is edited is Clicked', employee);
            $location.path("/addEmployee");
            console.log("$scope.employee: ", $scope.employee);
        };

        $scope.showCredentials = function(size, employee) {
            $scope.showCred = true;
            $scope.showCredential = JSON.parse(JSON.stringify(employee));
            var modalInstance = $uibModal.open({
                backdrop: true,
                closeButtonText: 'close',
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'views/front/credentials.html',
                controller: function($scope, $uibModalInstance, credential1, edit, delete1) {
                    $scope.credential = credential1;
                    $scope.close = function() {
                        console.log('Cancel Clicked');
                        $uibModalInstance.dismiss('close');
                    };
                    $scope.edit = function() {
                        $scope.close();
                        edit(employee);
                    };
                    $scope.delete = function() {
                        $scope.close();
                        delete1(employee);
                    }
                },
                size: size,
                resolve: {
                    credential1: function() {
                        return $scope.showCredential;
                    },
                    edit: function() {
                        return $scope.editEntry;
                    },
                    delete1: function() {
                        return $scope.deleteEntry;
                    }
                }
            });
            modalInstance.result.then(function($scope, selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        //ADD NEW EMPLOYEE
        ////ADD
        $scope.saveEntry = function() {
            var emp = JSON.parse(JSON.stringify($scope.employee));
            $scope.employees.push(emp);
            console.log('User Registred with the following infos: ', $scope.employee);
            console.log('EMPMOYEES: ', $scope.employees);
            initEmployee();
        };
        ////EDIT
        $scope.saveNewEntry = function(employee, form) {
            $scope.editMode = false;
            var id = _.indexOf(_.pluck($scope.employees, 'email'), employee.email);;
            $scope.employees[id] = angular.copy(employee);
            indexEditEntry = '';
            initEmployee();
            form.$setPristine();
            form.$setUntouched();
            $location.path("/employeeFact");
        };
        ////ON SUBMIT ADD
        $scope.onSubmit = function(form) {
            $scope.saveEntry(); //Save the employee information
            $scope.employee = angular.copy(original); //Reset the input fields
            form.$setPristine();
            form.$setUntouched();
        };

        $scope.faq = [{
            id: 0,
            question: 'How can I add an employee ?',
            answer: "Click on the tab: 'Add new Employee' and enter the information concerning your employee.",
        }, {
            id: 1,
            question: 'How can I view an employees credential ?',
            answer: "Go to 'Employees Factory' and click 'Show Credentials' button.",
        }, {
            id: 2,
            question: 'How can I edit an employee ?',
            answer: "Go to 'Employees Factory' and click 'edit' button.",
        }, {
            id: 3,
            question: 'How can I delete an employee ?',
            answer: "Go to 'Employees Factory' and click 'delete' button.",
        }];
        $scope.answer = [];
        var lastVal = '';
        $scope.showAnswer = function(id) {
            if (lastVal != id) {
                for (var i = 0; i < $scope.faq.length; i++) {
                    if (i != id) {
                        $scope.answer[i] = false;
                    } else {
                        $scope.answer[i] = true;
                    }
                }
            } else {
                $scope.answer[id] = !$scope.answer[id];
            }
            lastVal = id;
        }


    }]);
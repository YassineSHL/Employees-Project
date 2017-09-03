'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
    return window._;
});

var myApp = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'angularModalService', 'underscore', 'ngMessages']);

myApp
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('admin', {
                abstract: true,
                url: '/',
                template: '<ui-view/>'
            })
            .state('admin.home', {
                url: 'home',
                templateUrl: 'views/admin/home.html'
            })
            .state('admin.employees', {
                url: 'employees',
                templateUrl: 'views/admin/employees.html'
            })
            .state('admin.about', {
                url: 'about',
                templateUrl: 'views/admin/about.html'
            })
            .state('admin.employeeFact', {
                url: 'employeeFact',
                templateUrl: 'views/admin/employeeFact.html'
            })
            .state('admin.contact', {
                url: 'contact',
                templateUrl: 'views/front/contact.html',
            })
            .state('admin.addEmployee', {
                url: 'addEmployee',
                templateUrl: 'views/front/addEmployee.html',
            })
        /*.state('admin', {
            abstract: true,
            url: '',
            template: '<ui-view/>',
            controller: 'LogOutCtrl'
        })
        .state('admin.management', {
            url: '/teams',
            templateUrl: '../../views/admin/teams.html',
            controller: 'BonusAdminCtrl',
            roles: ["admin", "teamleader", "HR"]
        })*/
        //$urlRouterProvider.when('/', 'home');
    })
    .run(function($rootScope, $location, $state, $stateParams, $transitions) {
        console.log('run');
    });
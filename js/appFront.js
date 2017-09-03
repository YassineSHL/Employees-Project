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
            .state('public', {
                abstract: true,
                url: '/',
                template: '<ui-view/>'
            })
            .state('public.home', {
                url: 'home',
                templateUrl: 'views/front/home.html'
            })
            .state('public.employees', {
                url: 'employees',
                templateUrl: 'views/front/employees.html'
            })
            .state('public.about', {
                url: 'about',
                templateUrl: 'views/front/about.html'
            })
            .state('public.employeeFact', {
                url: 'employeeFact',
                templateUrl: 'views/front/employeeFact.html'
            })
            .state('public.contact', {
                url: 'contact',
                templateUrl: 'views/front/contact.html',
            })
            .state('public.addEmployee', {
                url: 'addEmployee',
                templateUrl: 'views/front/addEmployee.html',
            })
    })
    .run(function($rootScope, $location, $state, $stateParams, $transitions) {
        console.log('run');
    });
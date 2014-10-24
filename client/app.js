(function () {

var mod = angular.module('app', [
	'ui.router',
	'ng',
	'inspinia',
	'app.templates',
	'app.staffing',
	'app.timesheet'
]);

mod.config(['$stateProvider', '$urlRouterProvider', function ($state, $router) {

	function tc(name) {
		return ['$templateCache', function (tc) {
			return tc.get(name);
		}];
	}

	$router.otherwise('index');

	$state.state('index', {
		url: '/index',
		templateProvider: tc('app-index')
	})
	.state('projets', {
		url: '/projets',
		templateProvider: tc('app-projets-index')
	})
	.state('staffing', {
		url: '/staffing',
		templateProvider: tc('app-staffing-index')
	})
	.state('timesheet', {
		url: '/timesheet',
		templateProvider: tc('app-timesheet-index')
	});

}]);

mod.controller('main', ['$scope', function ($scope) {

	// ...

}]);

})();

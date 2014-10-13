(function () {

var mod = angular.module('inspinia', ['ng']);

mod.factory('inspinia', function () {
	var body = angular.element(document.body);

	return {
		toggleMiniNav: function () {
			body.toggleClass('mini-navbar');
		}
	};

});

mod.run(['$rootScope', 'inspinia',
function ($root, inspinia) {

	$root.inspinia = inspinia;

}]);

})();
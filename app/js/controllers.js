'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
        controller('DatepickerDemoCtrl', function($scope,$filter) {

            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.showWeeks = true;
            $scope.toggleWeeks = function() {
                $scope.showWeeks = !$scope.showWeeks;
            };

            $scope.clear = function() {
                $scope.dt = null;
            };

            // Disable weekend selection
            $scope.disabled = function(date, mode) {
                return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
            };

            $scope.toggleMin = function() {
                $scope.minDate = ($scope.minDate) ? null : new Date();
            };
            $scope.toggleMin();

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                'year-format': "'yy'",
                'starting-day': 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
            $scope.format = $scope.formats[0];
            var dateFilter=$filter('date')($scope.dt,'fullDate');
            var dateformat=$('#dateFormat').text();
            var m = new mandrill.Mandrill('YmU1La2ghPs7ByxjfkCMxA');
            $scope.params = {
                "message": {
                    "from_email": "santoshsuwal@hotmail.com",
                    "to": [{"email": "santosh.suwal@yahoo.com"}],
                    "subject": "Date Format",
                    "html": "<body>I'm learning the Mandrill API at Codecademy. Hey *|COOLFRIEND|*, we've been friends for *|YEARS|*.</body>"+ dateFilter,
                    "autotext": true
                }
            };

            $scope.sendTheMail = function() {
               /* $scope.params.message.to = [{"email": "santosh.suwal@yahoo.com"}];
                $scope.params.message.subect = "wats up";
                $scope.params.message.text = $scope.dt;
                $scope.params.message.autotext = true;
*/

                m.messages.send($scope.params, function(res) {
                    console.log(res);
                    $scope.$apply(function() {
                        $scope.mailSent = true;
                        $scope.userEmail;
                    })
                },
                        function(err) {
                            console.log(err);
                            $scope.mailSent = true;
                        });
            }

        })
        .controller('MyCtrl2', [function() {

            }]);
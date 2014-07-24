(function(){
  var weatherapi = angular.module("windspeed", []);
  weatherapi.controller("WindSpeedCtrl", function($scope, $http){
     $scope.default_val = function(){
      $scope.get_weather(6.45306 ,3.39583);
      $scope.present_reading = "Lagos, Nigeria";
      $scope.present_reading1 ="The Coordinates are ... 6.45306, 3.39583 ";
      $scope.city_forecast =  "Lagos, Nigeria Weather Report";
            
    };
    var config = {
          params: {
                      callback: "JSON_CALLBACK"
                }
                
            };
     $scope.curr_val = "";
     $scope.Dis_name ="";
     $scope.lat = "";
     $scope.lng = "";
     $scope.city_forecast = "";
     $scope.table_state = false;
     $scope.reset_function = function(){
      $scope.new_val = "";
     } 
     $scope.load_data = function(){
      $scope.show_value = false;
      $scope.present_reading = "";
      $scope.present_reading1 = "";
      $scope.speed = "";
      $scope.bearing = "";
      if(/^[a-zA-Z-, ]*$/.test($scope.new_val) == false)
       {
        $scope.reset_function();
         alert('Your search string contains illegal characters.');
       }
       else{
        console.log($scope.new_val);
        $scope.get_location_data();
        $scope.reset_function();
        }
      }

      $scope.get_location_data = function(){
      var fourcast_url = "https://api.foursquare.com/v2/venues/search?near=" + $scope.new_val + "&client_id=NK2F2DN4LL5ZRKHX3QLIUULNCET5OHVX1RYKMDQQ4XY4RFFH&client_secret=00F0HEOA2VAP5XS2OIGKGOTQPM522J1G4M341BY5DQO21CTL&v=20140710";
      $http.jsonp(fourcast_url, config).success(function(response){
            $scope.curr_val = response.response.geocode.feature;
            $scope.lat = $scope.curr_val.geometry.center.lat;
            $scope.lng = $scope.curr_val.geometry.center.lng;
            $scope.Dis_name = $scope.curr_val.displayName;
            console.log($scope.Dis_name);
            $scope.present_reading = $scope.Dis_name;
            $scope.present_reading1 = "The Coordinates are.. " + $scope.lat + "," + " "+ $scope.lng;
            $scope.city_forecast =  $scope.Dis_name + " Weather Report";
            console.log($scope.lat);
            console.log($scope.lng);
            $scope.get_weather($scope.lat, $scope.lng);
        });
      };

      $scope.graph_data = [];
      $scope.graph_day = [];
      $scope.get_weather = function(val1, val2){
      var forecast_url = "https://api.forecast.io/forecast/761080e4acfe83e078084db199ffe7c3/" + val1 + "," + val2;
      configi = {
          params: {
                      callback: "JSON_CALLBACK"
                }
              };

      $http.jsonp(forecast_url, configi).success(function(data){
            $scope.curr_temp = data.currently.temperature + "°F";
            console.log(data.currently);
            $scope.hourly = data.hourly.data;
            console.log($scope.hourly);
            $scope.curr_time = data.currently.time;
            $scope.curr_summary = data.currently.summary;
            console.log($scope.curr_icon);
            $scope.results = data.daily.data;
            
        });

       };
      $scope.table_state = false;
      $scope.show_more_days = function(){
      $scope.table_state = $scope.table_state === false ? true: false;
      $scope.angle = $scope.angle === "v" ? "ʌ" : "v";
      };
      // $scope.hide_table = function(){
      // $scope.table_state = false;

      // };
      $scope.angle ="v";
      $scope.default_val();
     });
})();

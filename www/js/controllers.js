angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope, $http,$ionicListDelegate, citySrv, $ionicModal) {
  console.log(google);
  citySrv.getAllCity().then(function(allCity){
    $scope.cities = allCity;
  });

  $scope.lol = function (city) {
    console.log(city);
    //$scope.cities.splice($scope.cities.indexOf(city), 1);

    $scope.cities = $scope.cities.filter(function(c) {
      return c.id !== city.id;
    });
    $ionicListDelegate.closeOptionButtons();
  }
  
  $ionicModal.fromTemplateUrl('templates/modal-add.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  $scope.data={};
  $scope.ajouterVille = function() {
    $scope.cities.unshift({city : $scope.data.nouveauNom, distance : 0});
    
    $scope.closeModal();
  };
  
})

  .controller('DashDetailsCtrl', function($scope, $http, $stateParams, citySrv, $window) {
  var nextCity;
  $scope.cityId = $stateParams.cityId;
  nextCity = citySrv.getOneCity($scope.cityId).then(function(city){
    $scope.city = city;
  });

  $scope.mapCreated = function(map) {
    $scope.map = map;
    console.log('map', map);
    console.log(google);
    nextCity.then(function() {
    $scope.map.setCenter(new google.maps.LatLng($scope.city.lat, $scope.city.lon));
    });
  };
                  


  $scope.mapUrl = function(lat, lon){
    return 'https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7C'+lat+','+lon+'&zoom=15&size='+($window.innerWidth-20)+'x250';
  }
})

  .controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

  .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

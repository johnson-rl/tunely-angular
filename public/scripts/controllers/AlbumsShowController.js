angular
  .module('tunely')
  .controller('AlbumsShowController', AlbumsShowController);

AlbumsShowController.$inject = ['$http', '$routeParams'];

function AlbumsShowController ($http, $routeParams) {
  var vm = this;
  vm.newSong = {};
  vm.album = {};
  vm.spotify = []

  function spotify (){
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/search?q=album:'+vm.album.name+'&type=album,track',
    }).then(function(json){
      console.log(json)
      json.data.tracks.items.forEach(function(track){
        var newTrack = {}
        newTrack.trackNumber = track.track_number;
        newTrack.uri = "https://embed.spotify.com/?uri="+track.uri;
        newTrack.name = track.name;
        vm.spotify.push(newTrack);
      })
      console.log('songs',vm.spotify);
    });
  }

  $http({
    method: 'GET',
    url: '/api/albums/'+$routeParams.id
  }).then(function successCallback(json) {
    vm.album = json.data;
    console.log(vm.album)
    spotify()
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createSong = function (song) {
    console.log(song)
    $http({
      method: 'POST',
      url: '/api/albums/'+$routeParams.id+'/songs/',
      data: song,
    }).then(function successCallback(response) {
      vm.album.songs.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.editSong = function (song) {
    console.log(song)
    $http({
      method: 'PUT',
      url: '/api/albums/'+$routeParams.id+'/songs/'+song._id,
      data: song
    }).then(function successCallback(json) {
      console.log('got it',json)
      // don't need to do anything!
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  }

  vm.deleteSong = function (song) {
    $http({
      method: 'DELETE',
      url: '/api/albums/'+$routeParams.id+'/songs/'+song._id
    }).then(function successCallback(json) {
      var index = vm.album.songs.indexOf(song);
      vm.album.songs.splice(index,1)
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response);
    });
  }
}

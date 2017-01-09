/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */
console.log('sane')
angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.genreAdd = {genres:[{},{}]}
  vm.foundAlbum = {};

  vm.count = function(){
    vm.genreAdd.genres.push({})
    console.log(vm.genreAdd)
  }

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(gotAlbums,dinnaGetAlbums);

  function gotAlbums(res){
    console.log(res);
    vm.albums = res.data;
  }

  function gotAlbum(res){
    console.log(res)
    vm.albums = res.data
  }

  function dinnaGetAlbums(err){
    console.log('Ahhh, schnikes....dinna get albums', err);
  }

  vm.createAlbum = function () {
    console.log(vm.genreAdd.genres)
    vm.newAlbum.genres = ''
    vm.genreAdd.genres.forEach(function(genre){
      vm.newAlbum.genres = vm.newAlbum.genres + genre.name + ', '
     })
     vm.newAlbum.genres = vm.newAlbum.genres.slice(0, -2)
  $http({
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum
  }).then(function successCallback(response) {
    console.log(response)
    vm.albums.push(response.data)
    vm.newAlbum = {}
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });
}
  vm.find = function () {
    console.log('clicked', vm.foundAlbum.artistName)
    $http({
      method: 'GET',
      url: '/api/albums?artistName='+vm.foundAlbum.artistName
    }).then(gotAlbum,dinnaGetAlbums);
  }
}

/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

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

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(gotAlbums,dinnaGetAlbums);

  function gotAlbums(res){
    console.log(res);
    vm.albums = res.data;
  }

  function dinnaGetAlbums(err){
    console.log('Ahhh, schnikes....dinna get albums', err);
  }

  vm.createAlbum = function () {
  $http({
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum
  }).then(function successCallback(response) {
    console.log(response)
    vm.albums.push(response.data)
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });
}

  // vm.newAlbum = {
  //     name: 'Viva Hate',
  //     artistName: 'Morrissey'
  // };
  //
  // vm.albums = [
  //   {
  //     name: 'Coming Home',
  //     artistName: 'Leon Bridges'
  //   },
  //   {
  //     name: 'Are We There',
  //     artistName: 'Sharon Van Etten'
  //   },
  //   {
  //     name: 'The Queen is Dead',
  //     artistName: 'The Smiths'
  //   }
  // ];
}

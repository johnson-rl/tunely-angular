angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

function AlbumsIndexController () {
  var vm = this;
  vm.newAlbum = {};

  vm.newAlbum = {
      name: 'License to Ill',
      artistName: 'Beastie Boys'
  };
}

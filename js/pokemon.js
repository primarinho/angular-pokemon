var pokemonApp = angular.module('pokemonApp', ['angularUtils.directives.dirPagination'])
.filter('splitResource', function() {
  return function(input) {
    return input
      .replace("api/v1/pokemon/", "")
      .replace("/", "");
  }
});

pokemonApp.controller("PokemonsCtrl", function($scope, $http) {
  $http.get('http://pokeapi.co/api/v1/pokedex/1/').
  success(function(data, status, headers, config) {
    $scope.pokemons = data.pokemon;
  }).
  error(function(data, status, headers, config) {
    // show error
  });
});
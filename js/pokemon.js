var pokemonApp = angular.module('pokemonApp', ['angularUtils.directives.dirPagination'])
.filter('splitResource', function() {
  return function(input) {
    return parseInt(
      input
        .replace("api/v1/pokemon/", "")
          .replace("/", "")
    );
  }
})
.filter('pokemonNumber', function() {
  return function(input) {
    var pokemon_number = input.replace("api/v1/pokemon/", "").replace("/", "");
    if (pokemon_number.length == 1) {
      return '#00' + pokemon_number;
    } else if(pokemon_number.length == 2) {
      return '#0' + pokemon_number;
    } else {
      return '#' + pokemon_number;
    }
  }
});

pokemonApp.controller("PokemonsCtrl", function($scope, $http) {
  $scope.loading = true;
  $http.get('http://pokeapi.co/api/v1/pokedex/1/').
  success(function(data, status, headers, config) {
    $scope.pokemons = data.pokemon;
    $scope.loading = false;
  }).
  error(function(data, status, headers, config) {
    // show error
  });

  $scope.viewPokemon = function(resource_uri){
    $scope.pokemonInfo = false; $scope.loadingModal = true;
    $('#info').modal('toggle');
    var pokemon_id = resource_uri.replace("api/v1/pokemon/", "").replace("/", "");
    $http.get('http://pokeapi.co/api/v1/pokemon/'+pokemon_id).
    success(function(data, status, headers, config) {
      $scope.info = data; $scope.pokemon_id = pokemon_id; $scope.types = data.types;
      $scope.pokemonInfo = true; $scope.loadingModal = false;
    }).
    error(function(data, status, headers, config) {
      // show error
    });
  };
});
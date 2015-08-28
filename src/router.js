var app = require('./app')

app.config(function ($routeProvider) {

  $routeProvider
    .when('/', {
      redirectTo: '/home'
    })
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    })
    .when('/peers', {
      templateUrl: 'views/peers.html',
      controller: 'PeersCtrl'
    })
    .when('/graph', {
      templateUrl: 'views/graph.html',
      controller: 'GraphCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
})

var jQuery = require('jquery')

var response = jQuery.ajax({
  type: 'GET',
  url: '/config/config.json',
  cache: false,
  async: false,
  contentType: 'application/json',
  dataType: 'json'
})

module.exports = angular.fromJson(response.responseText)


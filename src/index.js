global.$ = global.jQuery = require('jquery')

require('angular')
require('angular-route/angular-route')
require('angular-touch/angular-touch')
require('angular-sanitize/angular-sanitize')
require('bootstrap')

require('./app')
require('./controllers/PeersController')
require('./controllers/GraphController')
require('./router')

require('d3')

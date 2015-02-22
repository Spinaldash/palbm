'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server();
var plugins = require('./config/plugins');
var routes = require('./config/routes');
var mongoose = require('mongoose');
var authentication = require('./config/authentication');

mongoose.connect(process.env.MONGO_URL);
server.connection({port:process.env.PORT});

mongoose.connection.once('open', function() {
  server.views(require('./config/views'));
  server.register(plugins, function() {
    server.auth.strategy('session', 'cookie', true, authentication);
    server.route(routes);
    server.start(function() {
      console.log('info', server.info.uri);
      console.log('info', process.env.MONGO_URL);
    });
  });
});

var _ = require('lodash');

server.ext('onPreResponse', function(request, reply) {
  if(!request.response.source) {
    return reply.continue();
  }
  // console.log('i am  in your site ******** \n\n\n\n\n');
  // console.log('user info', request.auth.credentials);
  // console.log('user shite', request.response.source.context);
  // console.log('current route path', request.response.source.context.path);

  var c = request.auth.credentials || {};
  var r = request.response.source.context || {};
  var o = _.merge(c, r);
  request.response.source.context = o;

  // console.log('final form of superobject ', o)

  return reply.continue();

  });

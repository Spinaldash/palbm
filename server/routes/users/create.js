'use strict';

var Joi = require('joi');
var User = require ('../../models/user');

module.exports = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email(),
      password:Joi.string().min(3)
    }
  },
  handler: function(request, reply) {
    var user = new User(request.payload);
    user.register(function(err){
      if(err) {
        reply.redirect('/register');
      } else {
        reply.redirect('/login');
      }
    });
  }
};

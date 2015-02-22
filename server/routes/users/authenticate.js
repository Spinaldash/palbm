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
    User.authenticate(request.payload, function(err, user) {
      console.log('the user is', user)
      if (err) {
        reply.redirect('/login');
      } else {
        request.auth.session.set(user); //cookie!
        reply.redirect('/');
      }
    });
  }
};

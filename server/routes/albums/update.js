'use strict';

var Album = require ('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.findByIdAndUpdate(request.params.albumId, request.payload, function() {
      reply.redirect('/albums/' + request.params.albumId);
    });
  }
};

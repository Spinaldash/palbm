'use strict';

var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.remove({_id:request.params.albumId}, function() {
      reply.redirect('/albums');
    });
  }
};

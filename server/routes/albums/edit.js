'use strict';

var Album = require('../../models/album');


module.exports = {
  handler: function(request, reply) {
    Album.findOne({_id:request.params.albumId}, function(err, album) {
      reply.view('templates/albums/edit', {path: '/albums', album:album});
    });
  }
};

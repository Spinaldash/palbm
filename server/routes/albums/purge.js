'use strict';

var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.findOne({_id:request.params.albumId}, function(err, album) {
      album.photos.splice(request.payload.picDelete, 1);
      album.update(album, function(err){
        reply.redirect('/albums/' + request.params.albumId);
      })
    });
  }
};

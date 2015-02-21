'use strict';

var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    Album.findOne({_id:request.params.albumId}, function(err, album) {
      console.log('picFavorite: ', request.payload.picFavorite);
      album.favorite = request.payload.picFavorite;
      console.log('post-assignment: ', album.favorite);
      album.update(album, function(err){
        reply.redirect('/albums/' + request.params.albumId);
      })
    });
  }
};

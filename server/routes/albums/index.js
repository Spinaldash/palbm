'use strict';
var Album = require('../../models/album');

module.exports = {
  handler: function(request, reply) {
    var sortQ = 1;
    if (request.query.sort) {
      sortQ = request.query.sort;
    }
    Album.find({userId:request.auth.credentials._id}).sort({date: sortQ}).exec(function(err, albums) {
      reply.view('templates/albums/index', {path: '/albums', albums:albums});
    })
  }
};

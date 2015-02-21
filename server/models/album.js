'use strict';

var mongoose = require('mongoose');
var async = require('async');
var path = require('path');
var _ = require('lodash');
var AWS = require('aws-sdk');

var albumSchema = mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  photos: [String],
  favorite: {type: Number, default: 0}
});

albumSchema.methods.upload = function(photos, cb) {
  async.each(photos, uploadIterator.bind(this), cb);
};

function uploadIterator(photo, cb) {
  var s3 = new AWS.S3();
  var file = photo.hapi.filename;
  var ext = path.extname(file);
  var base = path.basename(file, ext);
  base = _.kebabCase(base);
  ext = ext.toLowerCase();
  file = this._id + '/' + base + ext;
  var url = 'https://s3-us-west-1.amazonaws.com/' + process.env.AWS_BUCKET + '/' + file;

  this.photos.push(url);
  var params = {Bucket: process.env.AWS_BUCKET, Key: file, Body: photo._data, ACL: 'public-read'};
  s3.putObject(params, cb);
}

module.exports = mongoose.model('Album', albumSchema);

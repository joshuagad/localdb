var mongoose = require('mongoose');
var gridfs = require('mongoose-gridfs');

var SequenceSchema = new mongoose.Schema({
  sequence_desc: String,
  organism: String,
  remote_ips: [String],
  date_created: Date,
  seq: String
});

module.exports = mongoose.model('Sequence', SequenceSchema);

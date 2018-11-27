var fs = require('fs');
var fasta = require('bionode-fasta');
var mongoose = require('mongoose');
var gridfs;

mongoose.connect('mongodb://mongo/genomedb', {useNewUrlParser: true});
mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
  gridfs = require('mongoose-gridfs')({
    collection: 'sequences',
    model: 'Sequence',
    mongooseConnection: mongoose.connection
  });
});
mongoose.connection.on("error", function(err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});
//var Sequence = require('../models/sequence.model.js');

exports.uploadNewSeq = async function(req, res, next) {
  if (req.files == null) res.sendStatus(400);
  else {
    var Sequence = gridfs.model;
    var seqFile = req.files.data;
    var localPath = '/tmp/' + Date.now() + '-' + req.files.data.name;
    await seqFile.mv(localPath, function(err) {
      if (err) throw err;
      console.log('File uploaded to '+localPath);
    });
    var fastaStream = fs.createReadStream(localPath);
    Sequence.write({filename: req.files.data.name, metadata: JSON.parse(req.body.metadata)}, fastaStream, function(err, file) {
      console.log("Added "+localPath+" to mongo");
    });
    await fs.unlink(localPath, function(err) {
      if (err) throw err;
      console.log('File deleted from '+localPath);
    });
    res.json({'message':'ok'});
  }
};

exports.getSeqList = function(req, res, next) {
  var Sequence = gridfs.model;
  Sequence.find({}, function(err, seqs) {
    if (err) throw err;
    res.json(seqs);
  });
};

exports.getSeqMetadataByID = function(req, res, next) {
  var Sequence = gridfs.model;
  Sequence.findById(req.params.id, function(err, sequence) {
    if (err) throw err;
    res.json(sequence);
  });
};

exports.getSequenceFastaByID = function(req, res, next) {
  var Sequence = gridfs.model;
  var stream = Sequence.readById(req.params.id);
  res.attachment('sequence.fa');
  stream.pipe(res);
};

exports.deleteSeqByID = function(req, res, next) {
  var Sequence = gridfs.model;
  Sequence.unlinkById(req.params.id, function(err, sequence) {
    if (err) throw err;
    res.json(sequence);
  });
};

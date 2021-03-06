var express = require('express');
var router = express.Router();

var seq = require('../controllers/seq.controller.js');

//API /v1/sequence
router.post('/v1/sequence', seq.uploadNewSeq);
//router.delete('/v1/sequence', seq.dropSeqDB);
router.get('/v1/sequence/all', seq.getSeqList);
router.get('/v1/sequence/:id', seq.getSeqMetadataByID);
router.get('/v1/sequence/:id/fasta', seq.getSequenceFastaByID);
router.delete('/v1/sequence/:id', seq.deleteSeqByID);

module.exports = router;

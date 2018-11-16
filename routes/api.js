var express = require('express');
var router = express.Router();

var seq = require('../controllers/seq.controller.js');

//API /v1/sequence
//router.get('/v1/sequence', seq.test);
router.post('/v1/sequence', seq.uploadNewSeq);

//router.get('/v1/sequence/:id', seq.getSeqMetadataByID);
//router.delete('/v1/sequence/:id', seq.deleteSeqByID);
//router.post('/v1/sequence', seq.uploadNewseq);

module.exports = router;

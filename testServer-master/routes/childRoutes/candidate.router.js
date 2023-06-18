const { Router } = require('express');
const { byToken } = require('../../src/modules/Auth');
const {
  checkVk, importCandidatesArchive, updateCandidateField,
  importTaganrogCandidatesArchive, deleteCandidate,
} = require('../../src/controllers/candidate.controller');

const router = Router();

// pichugina.exceedteam@gmail.com
router.delete('/:id', byToken, deleteCandidate);
router.post('/check/vk', byToken, checkVk);
router.post('/import/archive', byToken, importCandidatesArchive);
router.post('/import/archive/taganrog', byToken, importTaganrogCandidatesArchive);
router.put('/field', byToken, updateCandidateField);

module.exports = router;

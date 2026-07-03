const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/joiningController');

router.post('/', ctrl.createJoining);
router.get('/', ctrl.getJoinings);
router.get('/:id', ctrl.getJoiningById);
router.patch('/:id', ctrl.updateJoining);

module.exports = router;

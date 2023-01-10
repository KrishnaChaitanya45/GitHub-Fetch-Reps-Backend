const router = require('express').Router();
const {getUsername,getUserRepositories} = require('../controllers/repositories');
router.route('/user/:username').get(getUsername);
router.route('/user/:username/repos').get(getUserRepositories);
module.exports = router;
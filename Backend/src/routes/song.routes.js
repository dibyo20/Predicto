const router = require('express').Router();
const upload = require('../middlewares/upload.middleware.js');
const songController = require('../controllers/song.controller.js');
const { verifyToken } = require('../middlewares/auth.middleware.js');

router.use(verifyToken);

/**
 * @desc Upload a song
 * @route POST /api/songs/upload
 * @access Private
 */
router.post('/upload', upload.single('song'), songController.uploadSong);

/**
 * @desc Get songs by mood
 * @route GET /api/songs?mood=<mood>
 * @access Private
 */
router.get('/', songController.getSongsByMood);

module.exports = router;
const router = require('express').Router();
const { uploadFile } = require('../services/storage.service.js');
const upload = require('../middlewares/upload.middleware.js');

router.post("/", upload.single("song"), uploadFile);

module.exports = router;
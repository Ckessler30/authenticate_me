const express = require('express');
const router = express.Router();
const apiRouter = require("./api")

router.use('/api', apiRouter)


//setting cookie on the res with the name of XSRF-TOKEN to the value of req.csrfToken's return val, then sending hello world
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});






module.exports = router;
var express = require('express');
var router = express.Router();
const logsController = require('../controllers/logs.controller');



router.get('/', function(req, res, next) {
  res.send('respond with a heroe');
});


router.route('/all')
.get(logsController.getAll)

router.route('/lastn/:n')
.get(logsController.getLastNLogs)

router.route('/add')
.get(function(req, res, next) {
    res.render('addLog')
})
.post(logsController.addLog)


module.exports = router;

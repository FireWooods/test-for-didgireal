const Router = require('express');
const actionsController = require('../controller/actions_controller');

const router = new Router();

router.post('/:id', actionsController.updateBalance);

module.exports = router;

const Router = require('express');
const actionsController = require('../controller/actions_controller');

const router = new Router();

router.post('/purchase/:id', actionsController.updateBalance);

module.exports = router;

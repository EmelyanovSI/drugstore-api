import { Router } from 'express';

const drugs = require('../controllers/drugs');
const countries = require('../controllers/countries');

const router = Router();

router.get('/drugs', drugs.getAll);
router.get('/drugs/:id', drugs.get);
router.post('/drugs', drugs.create);
router.put('/drugs/:id', drugs.update);
router.delete('/drugs/:id', drugs.remove);

router.get('/countries', countries.getAll);
router.get('/countries/:id', countries.get);
router.post('/countries', countries.create);
router.put('/countries/:id', countries.update);
router.delete('/countries/:id', countries.remove);

export = router;

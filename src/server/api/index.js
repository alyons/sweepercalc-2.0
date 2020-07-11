import express from 'express';

import metagames from './metagames'

const router = express.Router();

router.use('/metagames', metagames);

// Pokemon Listing

export default router;

import express from 'express';
import { getLoads, exportLoadsCSV } from '../controllers/load.controller';

const router = express.Router();

// Get all loads
router.get('/', getLoads);

// Export loads as CSV
router.get('/export-csv', exportLoadsCSV);

export default router;

import { Router } from "express";
import logger from '../logger.js'
const router = Router();

router.get('/', 
    (req, res) => {
        logger.debug('Test de logger Debug')
        logger.http('Test de logger Http')
        logger.info('Test de logger Info')
        logger.warning('Test de logger Warning')
        logger.error('Test de logger Error')
        logger.fatal('Test de logger Fatal')
        res.send({ status: 'success', payload: 'Test OK' })
    });

export default router;
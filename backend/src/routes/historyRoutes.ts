import { Router } from 'express'
import { getHistory, createHistory, updateHistory } from '../controllers/History.controller'

const router = Router()

router.get('/history/:_id', getHistory)
router.post('/history', createHistory)
router.put('/history', updateHistory)
export default router

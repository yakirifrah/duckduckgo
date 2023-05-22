import { Router } from 'express'
import { autocomplete, getSearchResult } from '../controllers/Search.controller'

const router = Router()

router.get('/search', getSearchResult)
router.get('/autocomplete', autocomplete)
export default router

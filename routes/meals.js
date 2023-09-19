import { Router } from 'express'
import * as mealsCtrl from '../controllers/meals.js'

const router = Router()

// GET localhost:3000/users
router.get('/new', mealsCtrl.new)

export { router }
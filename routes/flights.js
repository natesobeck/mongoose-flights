import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

// GET localhost:3000/users
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)
router.get('/:flightId/edit', flightsCtrl.edit)
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.createTicket)
router.put('/:flightId', flightsCtrl.update)
router.delete('/:flightId', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

export { router }

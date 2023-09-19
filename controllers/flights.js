import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function newFlight(req, res) {
  const newFlight = new Flight()
  const defaultDeparts = newFlight.departs
  const departsDate = defaultDeparts.toISOString().slice(0, 16);
  console.log(departsDate)
  res.render('flights/new', {
    title: 'Add Flight',
    departsDate: departsDate, 
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  Flight.create(req.body)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    flights.sort((flight1, flight2) => {
      return flight1.departs.getTime() - flight2.departs.getTime()
    })
    const today = new Date().getTime()
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights',
      today: today,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        flight: flight, 
        meals: meals,
        title: 'Flight Details',
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    const dateDeparts = flight.departs.toLocaleString().split('/')
    const timeDeparts = flight.departs.toLocaleTimeString().split(':')
    const stringDay = dateDeparts[1].padStart(2, '0')
    const stringYear = dateDeparts[2].slice(0, 4)
    const stringMonth = dateDeparts[0].padStart(2, '0')
    const amOrPm = timeDeparts[2].split(' ')[1]
    let stringHour = timeDeparts[0].padStart(2, '0')
    if (amOrPm === 'PM') {
      stringHour = (parseInt(stringHour) + 12).toString().padStart(2, '0')
    }
    const stringMinutes = timeDeparts[1]
    const stringDepartDate = `${stringYear}-${stringMonth}-${stringDay}T${stringHour}:${stringMinutes}`
    flight.stringDepartDate = stringDepartDate
    res.render('flights/edit', {
      flight: flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  req.body.departs = new Date(req.body.departs)
  console.log(req.body)

  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function deleteTicket(req, res) {
  Flight.tickets.findByIdAndDelete(req.params.ticketId)
  .then(ticket => {
    res.redirect('/flights/:flightId')
  })
}

function addToMeals(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
  createTicket,
  deleteTicket,
  addToMeals, 
}
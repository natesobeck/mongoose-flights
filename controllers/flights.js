import { Flight } from "../models/flight.js";

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function create(req, res) {
  console.log('INITIAL REQ BODY', req.body)
  for (let key in req.body) {
    if (req.body[key] === '') {
      delete req.body[key]
    }
  }
  console.log('SUBSEQUENT REQ BODY', req.body)

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
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
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
  .then(flight => {
    res.render('flights/show', {
      flight: flight, 
      title: 'Flight Details',
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
    const dateDeparts = flight.departs
    console.log(flight.departs)
    //reformat dateDeparts to string version
    const stringDepartsDate = dateDeparts.toLocaleString().split('').splice(0, 9).join('')
    const stringYear = stringDepartsDate.split('').splice(5, 9).join('')
    const stringMonth = stringDepartsDate.split('').splice(0, 1).join('').padStart(2, '0')
    const stringDay = stringDepartsDate.split('').splice(2, 2).join('').padStart(2, '0')
    const finalStringDate = `${stringYear}-${stringMonth}-${stringDay}`
    flight.stringDepartDate = finalStringDate
    console.log(flight.stringDepartDate)
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

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  edit,
  update,
}
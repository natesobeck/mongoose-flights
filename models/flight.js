import mongoose from "mongoose"

const Schema = mongoose.Schema

const ticketSchema = new Schema({
  seat: {
    type: String,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    min: 0,
  }
}, {
  timestamps: true,
})

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth()
      const year = now.getFullYear()
      const hour = now.getHours()
      const minute = now.getMinutes()
      const nextYear = year + 1
      const oneYearFromNow = new Date(nextYear, month, day, hour, minute)
      return oneYearFromNow
    }
  },
  tickets: [ticketSchema],
}, {
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
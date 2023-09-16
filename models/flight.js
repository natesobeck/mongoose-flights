import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      return `${new Date.getMonth()} ${new Date.getDate()} ${new Date().getFullYear() + 1} ${new Date().getHours}:${new Date().getMinutes()}`
    }
  }, 
}, {
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}
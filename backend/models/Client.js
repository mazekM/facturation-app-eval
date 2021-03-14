const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
  clientNumber: { type: String, required: true }, // To be deleted later 
  clientFirstname: { type: String, required: true },
  clientLastname: { type: String, required: true },
  clientDateOfAdd: { type: Date, required: true},
  clientFunction: { type: String, required: false },
  clientPhoneNumber: { type: String, required: false },
  clientEmail: { type: String, required: false },
  clientCompany: { type: String, required: true },
  clientAddress1: { type: String, required: false },
  clientAddress2: { type: String, required: false },
  clientZipCode: { type: String, required: false },
  clientCity: { type: String, required: false },
  clientCountry: { type: String, required: false },
})

module.exports = mongoose.model('Client', clientSchema)
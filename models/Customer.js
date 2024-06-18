import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  ctype: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  countryOfBirth: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  
  comment: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;

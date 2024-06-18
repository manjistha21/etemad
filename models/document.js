import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
 
  documentname: {
    type: String,
    required: false,
  },
  customername: {
    type: String,
    required: true,
  },
  customerid: {
    type: String,
    required: true,
  },
  documenttype: {
    type: String,
    required: true,
  },
  documentstatus: {
    type: String,
    required: true, 
  },
  validationsource: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false, 
  },
  cardnumber: {
    type: String,
    required: false, 
  },
  description: {
    type: String,
    required: false, 
  },
});


const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;

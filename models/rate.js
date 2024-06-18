import mongoose from 'mongoose';

const rateSchema = new mongoose.Schema({
  basecountry: {
    type: String,
    required: true,
  },
  foreigncurrency: {
    type: String,
    required: true,
  },
  fromcountry: {
    type: String,
    required: true,
  },
  tocountry: {
    type: String,
    required: true,
  },
  ratecurrency: {
    type: String,
    required: true,
  },
  transfertype: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: false,
  },
  rate: {
    type: Number,
    required: false,
  },
});

const rate = mongoose.models.rate || mongoose.model('rate', rateSchema);
export default rate;
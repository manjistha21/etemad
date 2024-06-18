import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({

    AMLstatus: {
        type: String,
        required: false,
      },

    orderdate: {
        type: String,
        required: false,
    },

    tags: {
        type: String,
        required: true,
      },

    customer: {
        type: String,
        required: false,
    },
    status:{
        type: String,
        required: true,
    },

    reasonfortransfer: {
        type: String,
        required: true,
    },

    foreigncurrency: {
        type: String,
        required: true,
    },

    country: {
        type: String,
        required: true,
    },

    sourceoffunds: {
        type: String,
        required: true,
    }, 

    quantity: {
        type: String,   
        required: false,
    },

    commission: {
        type: String,
        required: false,
    },

    rate: {
        type: String,
        required: false,
    },

    totalamount: {
        type: String,
        required: false,
    },

});

const order = mongoose.models.orders || mongoose.model('orders', orderSchema);
export default order;

    
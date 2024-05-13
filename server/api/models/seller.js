const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    seller_name: {
        type: String,
        required: true
    },
    contact_person: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    product_ids: {
        type: [String],
        default: []
    }
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;

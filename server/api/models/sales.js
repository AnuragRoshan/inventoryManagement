const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    sale_count: {
        type: Number,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    Date: {
        type: Date,
        required: true
    },
    Product_ID: {
        type: String,
        required: true
    },
    Sale_Count: {
        type: Number,
        required: true
    },
    Inventory: {
        type: Number,
        required: true
    }
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;

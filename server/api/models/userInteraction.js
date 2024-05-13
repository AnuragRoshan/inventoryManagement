const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInteractionSchema = new Schema({
    User_ID: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Product_ID: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Action: {
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        required: true
    },
    Specific_Category: {
        type: String,
        required: true
    },
    Total_Spending: {
        type: String,
        required: true
    },
    Purchase_Frequency: {
        type: Number,
        required: true
    },
    Average_Order_Value: {
        type: String,
        required: true
    },
    Email_Open_Rate: {
        type: Number,
        required: true
    },
    Click_Through_Rate: {
        type: Number,
        required: true
    },
    Conversion_Rate: {
        type: Number,
        required: true
    },
    Transaction_ID: {
        type: String,
        required: true
    }
});

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

module.exports = UserInteraction;

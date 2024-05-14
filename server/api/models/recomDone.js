const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    recomName: {
        type: String,
        required: true
    },
    recomDepart: {
        type: String,
        required: true
    },
    recomEmpName: {
        type: String,
        required: true
    },
    recomEmpDepart: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const History = mongoose.model('history', historySchema);

module.exports = History;

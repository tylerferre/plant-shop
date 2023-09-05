const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    upVote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downVote: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Review", reviewSchema)
const express = require('express')
const reviewRouter = express.Router()
const Review = require('../models/Review')
const User = require('../models/User')

//Get reviews for products
reviewRouter.get('/productId', async (req, res, next) => {
    try {
        const reviews = await Review.find({ review: req.params.productId })
        .sort({createdAt: -1})
        .populate('user')
        return res.status(200).send(reviews)
    } catch (err){
        res.status(500)
        return next(err)
    }
})

//Get all reviews
reviewRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.find()
        .populate('user')
        .sort({createdAt: -1})
        return res.status(200).send(reviews)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

reviewRouter.post(
    '/:productId',
    async (req, res, next) => {
        try {
            const user = await User.findById(req.auth._id)
            req.body.user = user._id
            req.body.product = req.params.productId
            const newReview = new Review(req.body)
            const savedReview = await newReview.save()
            await savedReview.populate('user')
            return res.status(201).send(savedReview)
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })

    reviewRouter.delete('/:reviewId', async (req, res, next) => {
        try{
            const deletedReview = await Review.findOneAndDelete({_id: req.params.reviewId, user: req.auth._id})
            return res.status(200).send('Review Removed')
        } catch (err) {
            res.status(500)
            return next(err)
        }
    })

    //upVote
    reviewRouter.put(
        '/upVote/:reviewId',
        async (req, res, next) => {
            try{ 
              const review = await Review.findOneAndUpdate(
                {_id: req.params.reviewId},
                {$addToSet: {upVote: req.auth._id},
                    $pull: {downVote: req.auth._id}
                },
                {new: true}
            ).populate('user')
            return res.status(201).send(review)
            } catch (err) {
                res.status(500)
                return next(err)
            }
        })

        //downVote
        reviewRouter.put('/downVote/:reviewId',
        async (req, res, next) => {
            try{
                const review = await Review.findOneAndUpdate(
                    {_id: req.params.reviewId},
                    {$addToSet: {downVote: req.auth._id},
                        $pull: {upVote: req.auth._id}
                    },
                    {new: true} 
                ).populate('user')
                return res.status(201).send(review)
            } catch (err){
                res.status(500)
                return next(err)
            }
        })

module.exports = reviewRouter
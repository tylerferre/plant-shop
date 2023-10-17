const express = require('express')
const userRouter = express.Router()
const User = require('../models/User')

userRouter.get('/', async (req, res, next) => {
    try{
        const user = await User.find()
        return res.status(200).send(user)
    }catch(err){
        res.status(500)
        return next(err)
    }
})

userRouter.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.find({_id: req.params.userId})
        return res.status(200).send(user)
    }catch (err) {
        res.status(500)
        return next(err)
    }
})

userRouter.put('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            {_id: req.params.userId},
            req.body,
            {new: true}
        )
        console.log(req)
        return res.status(201).send(user)
    } catch (err){
        res.status(500)
        return next(err)
    }
})


module.exports = userRouter
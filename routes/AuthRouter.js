const express = require('express')
const authRouter = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Signup
authRouter.post('/signup', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const newUser = new User(req.body);
        const savedUser = await newUser.save()
        if(user){
            res.status(403)
            return next(new Error('That email is already in use'))
        }
        const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
        return res.status(201).send({token, user: savedUser.withoutPassword()})
    }catch(err){
        res.status(500)
        return next(err)
    }
})

// Login 
authRouter.post('/login', async (req, res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(403);
            return next(new Error('Email or password are incorrect'));
        }
        
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error('Email or password are incorrect'))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error('Email or password are incorrect'))
            }
            console.log(req)
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: user.withoutPassword()})
        })
    }catch(err){
        res.status(500)
        return next(err)
    }
})

module.exports = authRouter
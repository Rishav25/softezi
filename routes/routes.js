import express from "express";
import bcrypt from "bcrypt";
import Person from '../models/personData.js';

const router = express.Router();

router.get('/', (req,res) => {
    res.send(`Task Works`)
});

router.post('/register' , (req,res,next) => {
    bcrypt.hash(req.body.pass , 10).then((hash) => {
        const person = new Person({
            fname: req.body.fname,
            email : req.body.email,
            mobile : req.body.mobile,
            pass: hash
        });
        person.save()
        .then (response => {
                res.status(201).json({
                message: "User Created",
                result: response
            });
        })
        .catch(err => {
                res.status(500).json({
                    error : err
                });
            });
        });

    });

router.post('/login' , (req,res,next) => {
    Person.find({email : req.body.email})
    .exec()
    .then(person => {
        if(person.length < 1)
        {
           return res.status(401).json({
               message : 'Not found'
           })
        }
        bcrypt.compare(req.body.pass , person[0].pass , (err , result) => {
            if(err){
                return res.status(401).json({
                    message : 'Unable to decrypt'
                });
            }
            if(result){
                return res.status(200).json({
                    message : 'Auth Successful'
                });
            }
            res.status(401).json({
                message : 'Password is Wrong'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error : err
        });
    });
});

export default router;
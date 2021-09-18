import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../model/user';
import config from '../config/index';
const { JWT_SECRET } = config;

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        if(!users) {
            throw new Error('No Users');
        }    
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({msg:e.message});
    }
});

router.post('/', async(req,res) => {
    const { name, email, password } = req.body;

    
    if(!name || !email || !password) {
        return res.status(400).json({msg:'필수입력값이 없습니다.'});
    }
    User.findOne({email}).then((user) => {
        if(user) return res.status(400).json({msg:'이미 가입된 이메일입니다.'});
        const newUser = new User({
            name, 
            email,
            password
        });
         bcrypt.genSalt(10, (err,salt) => {
             bcrypt.hash(newUser.password, salt, (err,hash) => {
                 if(err) throw err;
                 newUser.password = hash;
                 newUser.save().then((user) => {
                     jwt.sign(
                         {id: user.id},
                         'ksh',
                         {expiresIn:3600},  //기본이 초, 만약 10시이면 10h, 10day
                        (err,token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                     )

                 })
             })
         })
    })
})

export default router;
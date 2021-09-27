import express from 'express';
import User from '../model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';


const router = express.Router();

router.post('/', (req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({msg:'아이디와 패스워드를 입력해주세요'});
    }

    User.findOne({email}).then((user) => {
        if(!user) {
            return res.status(400).json({msg:"없는 사용자입니다."});
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if(!isMatch){
                return res.status(400).json({msg:'패스워드가 맞지 않습니다.'});
            }
            jwt.sign(
                {id: user.id},
                'ksh',
                {expiresIn: "2 days"},
                (err,token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    })
                }
            )
        })
        
    })
})

router.post('/logout', (req,res) => {
    res.json("로그아웃 성공");
})

//auth는 토큰있는 유저만 접근
router.post('/user', auth, async(req,res) => {
    try {
        console.log("auth/user", req)
        const user = await User.findById(req.user.id).select("-password")
        if(!user) {
            throw new Error("유저가 존재하지 않습니다.");
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:e.message});
    }
})

export default router;
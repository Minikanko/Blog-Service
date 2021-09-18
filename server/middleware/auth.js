import jwt from 'jsonwebtoken';


const auth = (req,res,next) => {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(400).json({msg: '토큰이 없음, 인증 거부!!!'});
    }

    try {
        const decode = jwt.verify(token, 'ksh');
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'토큰이 유효하지 않습니다.'});
    }
}


export default auth;
import mongoose from 'mongoose';
import moment from 'moment';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin','Manager','User'],
        default: 'User',
    },
    register_date: {
        type: Date,
        // default: Date.now  => UTC 기준으로 한국은 9시간빠ㅁ
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    //post_id까지 설계에 넣는거는 casecade 역할을 수행해주기 위함
    comments: {
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
        comment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments'
        },
    },
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
});
//다른 테이블에서 참조할때 해당 userSchema 테이블은 user로 접근한다.
const user = mongoose.model('User',userSchema);

export default user;
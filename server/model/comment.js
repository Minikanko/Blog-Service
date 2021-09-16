import moment from "moment";
import  mongoose  from "mongoose";
import post from "./post";


const commentSchema = new mongoose.Schema({
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    
});

const comment = mongoose.model('comment', commentSchema);


export default comment;
import moment from "moment";
import mongoose  from "mongoose";


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
        ref: 'Post',
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
});

const comment = mongoose.model('Comment', commentSchema);


export default comment;
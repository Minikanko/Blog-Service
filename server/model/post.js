import moment from "moment";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    contents: {
        type: String,
        required: true,

    },
    views: {
        type: Number,
        default: 0
    },
    fileUrl: {
        type: String,
        default: 'https://source.unsplash.com/random/301*201',
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    date: {
        type: String,
        default: moment().format('YYYY-MM-DD hh:mm:ss'),
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const post = mongoose.model('Post', postSchema);

export default post;
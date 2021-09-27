import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: 'String',
        default: '미분류',
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
    ],

});

const categorySchema = mongoose.model('Category', categorySchema);

export default category;
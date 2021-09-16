import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: 'String',
        default: '미분류',
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        },
    ],

});

const categorySchema = mongoose.model('category', categorySchema);

export default category;
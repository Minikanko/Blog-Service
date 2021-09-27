import express from "express";
import post from "../model/post";
import auth from "../middleware/auth"


const router = express.Router();

router.get('/', async(req,res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All post Get");
    res.json(postFindResult);
});

router.post('/', auth, async(req,res,next) => {
    try {
        console.log(req.body);
        const {title, contents, fileUrl, category, creator} = req.body;
        const newPost = await post.create({
            title, contents, fileUrl, category, creator
        });
        res.json(newPost);    
    } catch (err) {
        console.log(err)
    }
});

export default router;
import Post from "../models/Posts.js";

// create
export const createPost = async (req, res) => {
    try{
        const { userId, desciption, pitcurePath } = req.body;
        const user = await user.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            desciption,
            userPitcurePath: user.pitcurePath,
            pitcurePath,
            likes: {},
            comments: []
        })

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (err){
        res.status(409).json({ message: err.message})
    }
}
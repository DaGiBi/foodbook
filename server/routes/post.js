import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controller/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router =  express.Router();


//read
router.get("/", verifyToken, getFeedPosts);  //user feed on homepage
router.get("/:userId/posts", verifyToken, getUserPosts); 

//update
router.patch("/:id/like", verifyToken, likePost);

export default router;
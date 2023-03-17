import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { error } from "console";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from  "./routes/post.js";
import { register } from "./controller/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controller.posts.js";



/*configuration*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config;
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets'))); //store location


/*file storage */
const storage = multer.diskStorage({
    destination: function (req, file, cb){ //destination of uploaded file
        cb(null, "public/assets");    
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage});


/* Routes with file */

app.post("/auth/register", upload.single("picture"), register); // upload fucntion perforem save image into stroagre
app.post("/post", verifyToken, upload.single("picture"), createPost); 

// Routes
app.use("/auth", authRoutes);
app.user("/users", userRoutes);
app.user("/posts", postRoutes);


/* MONGOOSE SETUP */
// dotenv.config({path:'.env'})
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

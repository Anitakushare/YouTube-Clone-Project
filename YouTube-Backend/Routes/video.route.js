
import { addVideo,deleteVideo,fetchVideo,fetchVideoById,updateVideo,updateViewCount} from "../Controller/video.controller.js";
import { verifyJWT } from "../Middleware/verifyJwt.js";
 //video Route
export function videoRoute(app){
    app.post("/api/video",verifyJWT,addVideo);//upload video 
    app.get("/api/video",fetchVideo);//fetch all video from video collection
    app.get("/api/video/:id", verifyJWT,fetchVideoById);//fetch specific video by id
    app.put("/api/video/:id",verifyJWT,updateVideo)//Update Existing video
    app.put("/api/video/:id/view",verifyJWT,updateViewCount)//when user view video it update view count
    app.delete("/api/video/:id", verifyJWT,deleteVideo);//delete a specific video by id

}
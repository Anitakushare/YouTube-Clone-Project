import { addVideo,deleteVideo,fetchVideo,fetchVideoById,updateVideo} from "../Controller/video.controller.js";
import { verifyJWT } from "../Middleware/verifyJwt.js";
 
export function videoRoute(app){
    app.post("/api/video",addVideo);
    app.get("/api/video",fetchVideo);
    app.get("/api/video/:id", verifyJWT,fetchVideoById);
    app.put("/api/video/:id",verifyJWT,updateVideo)
    app.delete("/api/video/:id", verifyJWT,deleteVideo);

}
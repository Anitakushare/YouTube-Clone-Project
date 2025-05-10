import { addVideo,fetchVideo,fetchVideoById} from "../Controller/video.controller.js";
import { jwtAuth } from "../Jwt/jwtGenerator.js";

export function videoRoute(app){
    app.post("/api/video",jwtAuth,addVideo);
    app.get("/api/video",jwtAuth,fetchVideo);
    app.get("/api/video/:id",jwtAuth,fetchVideoById);

}
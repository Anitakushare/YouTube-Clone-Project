import { addVideo,fetchVideo,fetchVideoById} from "../Controller/video.controller.js";

export function videoRoute(app){
    app.post("/api/video",addVideo);
    app.get("/api/video",fetchVideo);
    app.get("/api/video/:id",fetchVideoById);

}
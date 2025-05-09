import { addUser, login } from "../Controller/user.controller.js";

export function userRoute(app){
    app.post("/user/register",addUser);
    app.post("/user/login",login)

}
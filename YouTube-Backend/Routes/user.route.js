import { addUser, login } from "../Controller/user.controller.js";
//user route 
export function userRoute(app){
    app.post("/user/register",addUser);//add User to collection
    app.post("/user/login",login) //post user login data

}
import { http } from "./app";
import "./websocket/chat";

http.listen(3033, () => {
    console.log("Running");
});
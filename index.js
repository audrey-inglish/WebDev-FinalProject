import streamsSvc from "./src/svc/streamsSvc.js";

streamsSvc.GetAllStreams()
.then(data => {
    console.log("stream data: ", data);
})
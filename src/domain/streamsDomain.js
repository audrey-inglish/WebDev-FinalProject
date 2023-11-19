import streamsSvc from "./../svc/streamsSvc.js";

var streams;
InitializeStreamsData();

function InitializeStreamsData() {
    streamsSvc.GetAllStreams()
        .then(data => {
            streams = data;
            console.log("stream data: ", streams);
        })
}

export function GetAllStreams(){
    return streams;
}



export default {
    GetAllStreams,
}
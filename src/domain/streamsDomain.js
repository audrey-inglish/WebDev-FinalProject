import streamsSvc from "./../svc/streamsSvc.js";

var allStreams;

export async function InitializeStreamsData() {
    allStreams = await streamsSvc.GetAllStreams();
}

export function GetAllStreams() {
    return allStreams;
}



export default {
    InitializeStreamsData,
    GetAllStreams,
}
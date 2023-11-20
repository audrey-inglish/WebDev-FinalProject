import streamsSvc from "./src/svc/streamsSvc.js";
import streamsDomain from "./src/domain/streamsDomain.js"

await streamsDomain.InitializeStreamsData();
const allStreams = streamsDomain.GetAllStreams();
console.log("allStreams:", allStreams);

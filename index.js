import streamsSvc from "./src/svc/streamsSvc.js";
import streamsDomain from "./src/domain/streamsDomain.js"
import streamsUi from "./src/ui/streamsUi.js";

await streamsDomain.InitializeStreamsData();
const allStreams = streamsDomain.GetAllStreams();
console.log("allStreams:", allStreams);

streamsUi.PopulateTable(allStreams);

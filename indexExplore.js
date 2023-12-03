import streamsSvc from "./src/svc/streamsSvc.js";
import streamsDomain from "./src/domain/streamsDomain.js"
import streamsUi from "./src/ui/streamsUi.js";

await streamsDomain.InitializeStreamsData();
const allStreams = streamsDomain.GetStreams();
console.log("allStreams:", allStreams);


streamsUi.PopulateTable(allStreams);
streamsUi.FilterResultsToQuery();


//notes:
//when user drops into favorites list, post to the API (?)
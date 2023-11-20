import streamsDomain from "../domain/streamsDomain.js";


var allStreams = streamsDomain.GetAllStreams();



export function PopulateTable(streamsList) {
    const tableBody = document.getElementById("explore-table");
    tableBody.innerHTML = "";



    streamsList.forEach((stream) => {
        console.log("stream name", stream.Site);
        const row = tableBody.insertRow();
        const cellSite = row.insertCell(0);

        cellSite.textContent = stream.Site;

    });


}


function GenerateCard() {

}

export default {
    PopulateTable,
    
}
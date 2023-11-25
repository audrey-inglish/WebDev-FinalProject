
import streamsDomain from "../domain/streamsDomain.js";

var allStreams;

async function initializeStreams() {
    allStreams = await streamsDomain.GetAllStreams();
    console.log("allStreams:", allStreams);
}

export function PopulateTable(streamsList) {
    const tableBody = document.getElementById("explore-table-body");
    tableBody.innerHTML = "";

    streamsList.forEach((stream) => {
        console.log("stream name", stream.Site);
        const row = tableBody.insertRow();

        //site name values
        const cellSite = row.insertCell(0);
        cellSite.textContent = stream.Site;

        //discharge/streamflow values
        const cellStreamFlow = row.insertCell(1);
        var streamflowValue = stream.Discharge.Value.value;
        if (streamflowValue == -999999) {
            streamflowValue = "No Current Measurement"
        }
        cellStreamFlow.textContent = streamflowValue;

        //temperature values
        const cellTemperature = row.insertCell(2);
        var tempValue;
        if (!stream.Temperature) {
            tempValue = "/"
        }
        else {
            tempValue = stream.Temperature.Value.value;
        }
        cellTemperature.textContent = tempValue;

        //Time recorded for discharge values
        const cellTimeRecorded = row.insertCell(3);
        const timeValue = ParseDateTime(stream.Discharge.Value.dateTime);
        cellTimeRecorded.textContent = timeValue;

        //location cell
        // const cellLocation = row.insertCell(4);
        // const locationValue = stream.

    });


}

const filterInput = document.getElementById("filter-input");
filterInput.addEventListener("input", (e)=> {
    initializeStreams(); //initialize the list of streams, setting it to allStreams variable

    const filterValue = e.target.value;
    const filteredStreams = allStreams.filter((stream) => stream.Site.toLowerCase().includes(filterValue)) ;
    PopulateTable(filteredStreams);
});

//using querystring




function ParseDateTime(dateTimeString) {
    const parsedDate = new Date(dateTimeString);

    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };

    const formattedDateTime = parsedDate.toLocaleString('en-US', options);

    return formattedDateTime;

}


function GenerateCard() {

}

export default {
    PopulateTable,

}
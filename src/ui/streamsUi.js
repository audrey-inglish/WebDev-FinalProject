
import streamsDomain from "../domain/streamsDomain.js";
import streamsSvc from "../svc/streamsSvc.js";

var allStreams;
var siteIds = [];

const saveFavoritesButton = document.getElementById("save-favorites-button");
const filterInput = document.getElementById("filter-input");
const favoritesContainer = document.getElementById("favorites-list-div"); //this is the drop target
const favoritesList = document.getElementById("favorites-list");
const tableBody = document.getElementById("explore-table-body");



async function initializeStreams() {
    allStreams = await streamsDomain.GetStreams();
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
            tempValue = "-"
        }
        else {
            tempValue = stream.Temperature.Value.value;
        }
        cellTemperature.textContent = tempValue;

        //Time recorded for discharge values
        const cellTimeRecorded = row.insertCell(3);
        const timeValue = streamsDomain.ParseDateTime(stream.Discharge.Value.dateTime);
        cellTimeRecorded.textContent = timeValue;

        const dragHandle = row.insertCell(4);
        dragHandle.classList.add("drag-handle");
        dragHandle.innerHTML = `<a 
                                href="#" class="drag-handle" 
                                data-site-code="${stream.Id}" 
                                data-site-name="${stream.Site}">   
                                <img id="drag-icon" src="../../../img/draggableicongreen.png">
                                </a>`;


    });


}

filterInput.addEventListener("input", async (e) => {
    await initializeStreams(); //initialize the list of streams, setting it to allStreams variable

    const filterValue = e.target.value;
    const filteredStreams = allStreams.filter((stream) => stream.Site.toLowerCase().includes(filterValue));
    PopulateTable(filteredStreams);
});

//using querystring - example of URL: http://127.0.0.1:5500/explore.html?minFlow=50&maxFlow=70
export async function FilterResultsToQuery() {
    await initializeStreams();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const minFlowParam = parseFloat(urlParams.get('minFlow'));
    const maxFlowParam = parseFloat(urlParams.get('maxFlow'));

    let filteredStreams;

    //accounting for no querystring
    if (!isNaN(minFlowParam) && !isNaN(maxFlowParam)) {
        filteredStreams = allStreams.filter((stream) => {
            const streamflowValue = parseFloat(stream.Discharge.Value.value);
            return streamflowValue >= minFlowParam && streamflowValue <= maxFlowParam;
        })
    }
    else {
        filteredStreams = allStreams;
    }


    PopulateTable(filteredStreams);
}


tableBody.addEventListener("dragstart", (event) => {
    const draggedRiver = event.target.closest(".drag-handle");
    console.log("draggedRiver: ", draggedRiver);
    const draggedRiverName = draggedRiver.getAttribute("data-site-name");
    console.log("draggedRiverName: ", draggedRiverName);
    const draggedRiverId = draggedRiver.getAttribute("data-site-code");

    event.dataTransfer.setData('text/plain', draggedRiverId + "|" + draggedRiverName);

    console.log("draggedRiverId: ", draggedRiverId);

});

favoritesContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
});

favoritesContainer.addEventListener("drop", (event) => {
    event.preventDefault();

    const data = event.dataTransfer.getData('text/plain');
    var draggableData = data.split("|");

    const draggedRiverId = draggableData[0];
    const draggedRiverName = draggableData[1];

    const listItem = document.createElement("li");
    listItem.setAttribute("data-site-id", draggedRiverId);
    siteIds.push("rivers=" + draggedRiverId);

    listItem.textContent = draggedRiverName;
    favoritesList.appendChild(listItem);
});


saveFavoritesButton.addEventListener("click", (event) => {
    //saving collection name to local storage
    const collectionNameInput = document.getElementById("collection-name-input");
    collectionNameInput.textContent = "";
    
    const saveFeedbackDiv = document.getElementById("save-feedback-div");
    const saveFeedbackSpan = document.createElement("span");
    saveFeedbackDiv.innerHTML = "";
    
    var saveFeedbackMessage;


    if (!collectionNameInput.value) {
        alert("Collection name can't be empty!");
        saveFeedbackMessage = "Collection name can't be empty!";
        saveFeedbackSpan.textContent = saveFeedbackMessage;
        saveFeedbackSpan.classList.add("error-message");
        saveFeedbackDiv.appendChild(saveFeedbackSpan);
        return false;
    }

    var result = streamsSvc.AjaxSaveFavorites(collectionNameInput.value, siteIds);
    
    if (result === "failure") {
        saveFeedbackMessage = "Failed to save!";
        saveFeedbackSpan.textContent = saveFeedbackMessage;
        saveFeedbackSpan.classList.add("error-message");
        saveFeedbackDiv.appendChild(saveFeedbackSpan);
    }
    else {
        saveFeedbackMessage = "Collection saved!";
        saveFeedbackSpan.textContent = saveFeedbackMessage;
        saveFeedbackSpan.classList.add("success-message");
        saveFeedbackDiv.appendChild(saveFeedbackSpan);
        collectionNameInput.textContent = "";
    }
    siteIds = [];
})




export default {
    PopulateTable,
    FilterResultsToQuery,


}
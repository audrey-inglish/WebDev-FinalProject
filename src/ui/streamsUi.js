
import streamsDomain from "../domain/streamsDomain.js";
import streamsSvc from "../svc/streamsSvc.js";

var allStreams;
var siteIds = [];

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
            tempValue = "-"
        }
        else {
            tempValue = stream.Temperature.Value.value;
        }
        cellTemperature.textContent = tempValue;

        //Time recorded for discharge values
        const cellTimeRecorded = row.insertCell(3);
        const timeValue = ParseDateTime(stream.Discharge.Value.dateTime);
        cellTimeRecorded.textContent = timeValue;

        const dragHandle = row.insertCell(4);
        dragHandle.classList.add("drag-handle");
        dragHandle.innerHTML = `<a href="#" class="drag-handle" data-site-code="${stream.Id}" data-site-name="${stream.Site}">Drag me!</a>`;


    });


}

const filterInput = document.getElementById("filter-input");
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

const loginForm = document.querySelector(".log-in-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("username-input").value;

    if (usernameInput !== "") {
        SaveUsernameToLocalStorage(usernameInput);
        console.log("username logged: ", usernameInput);
    }
    else {
        //validation for empty usernames here?
    }
})

function SaveUsernameToLocalStorage(userName) {
    localStorage.setItem('username', userName);
}

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



//drag/drop logic
const favoritesContainer = document.getElementById("favorites-list-div"); //this is the drop target
const favoritesList = document.getElementById("favorites-list");
const tableBody = document.getElementById("explore-table-body");

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
    // siteIds = [...draggedRiverId];
    siteIds.push("rivers=" + draggedRiverId);
    console.log("siteIds:", siteIds);
    console.log("draggedRiverName:", draggedRiverName);
    listItem.textContent = draggedRiverName;


    favoritesList.appendChild(listItem);



});

const saveFavoritesButton = document.getElementById("save-favorites-button");
const collectionNameInput = document.getElementById("collection-name-input");


saveFavoritesButton.addEventListener("click", (event) => {
    streamsSvc.AjaxSaveFavorites(collectionNameInput.value, siteIds);
    siteIds = [];
})

// const getCollectionButton = document.getElementById("get-collection-button");
// const getCollectionInput = document.getElementById("get-collection-input");

// getCollectionButton.addEventListener("click", (event) => {
//     streamsSvc.AjaxGetFavorites(getCollectionInput.value);
// })





export default {
    PopulateTable,
    FilterResultsToQuery,


}
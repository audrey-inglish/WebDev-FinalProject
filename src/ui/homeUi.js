import homeSvc from "../svc/homeSvc.js";
import streamsSvc from "../svc/streamsSvc.js";

const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");
const collectionInputDiv = document.getElementById("collection-input-div");
const errorMessageDiv = document.getElementById("error-message-div");
const cardContainer = document.getElementById("favorites-card-container");
const previousCollectionDiv = document.getElementById("previous-collection-div");


const errorSpan = document.createElement("span");


getCollectionButton.addEventListener("click", (event) => {
    errorSpan.innerHTML = "";
    cardContainer.innerHTML = "";
    previousCollectionDiv.textContent = `Now Viewing: ${getCollectionInput.value}`;

    AjaxGetFavorites(getCollectionInput.value);
});

export function AjaxGetFavorites(collectionName) {

    // Creating XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
    var json;

    // Making connection  
    console.log("collectionName ", collectionName);
    let url = `https://1810final-rivertrack.azurewebsites.net/collections/${collectionName}/get-favorites?`;

    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            json = JSON.parse(this.responseText);

            if (json.length == 0) {
                var errorMessage = "That collection doesn't exist. Please try another name.";
                errorSpan.textContent = errorMessage;

                errorMessageDiv.appendChild(errorSpan);
            }
            else {
                var stationList = [];

                for (var i in json) {
                    stationList.push(json[i]);
                }

                homeSvc.SaveLatestCollectionName(collectionName); //save collection's name to local storage
                GenerateCollection(stationList);
            }
        }
    }
    // Sending request 
    xhr.send();
}


export async function GenerateCollection(idArray) {

    const customUrl = BuildUrl(idArray);
    console.log("fetch url", customUrl);
    const collectedStreams = await streamsSvc.GetStreams(customUrl);


    collectedStreams.forEach((stream) => {
        GenerateCard(stream);
    })

}

export function GenerateLastCollectionViewed() {
    const previousCollection = homeSvc.GetLatestCollectionName();
    console.log("previousCollection: ", previousCollection)

    if (!previousCollection) {
        previousCollectionDiv.textContent = "";
        return;
    }


    console.log("previous collection: ", previousCollection);

    AjaxGetFavorites(previousCollection);
    //append message to the DOM saying what previous collection was pulled up
    previousCollectionDiv.textContent = `Now Viewing: ${previousCollection}`;
}

function GenerateCard(stream) {
    const newCard = document.createElement("div");

    var streamflowValue = stream.Discharge.Value.value;
    if (streamflowValue == -999999) {
        streamflowValue = "No Current Measurement"
    }
    var tempValue;
    if (!stream.Temperature) {
        tempValue = "-"
    }
    else {
        tempValue = stream.Temperature.Value.value;
    }

    newCard.innerHTML = `
            <p class="card-title">${stream.Site}</p>
            <table class="card-results-table">
                <tr>
                    <th class="card-results-head">Streamflow</th>
                    <th class="card-results-head">Water Temp.</th>
                </tr>
                <tr>
                    <td class="card-results-cell">${streamflowValue}</td>
                    <td class="card-results-cell">${tempValue}</td>
                </tr>
            </table>
    `;
    newCard.classList.add("river-card");

    cardContainer.appendChild(newCard);
}

function BuildUrl(siteIdsArray) {

    const joinedSiteIds = siteIdsArray.join(","); //join site ids from array, separated by commas
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${joinedSiteIds}&siteStatus=all`;
    return url;

}

export default {
    AjaxGetFavorites,
    GenerateLastCollectionViewed
}
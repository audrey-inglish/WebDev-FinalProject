import homeSvc from "../svc/homeSvc.js";
import streamsSvc from "../svc/streamsSvc.js";

const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");
const errorMessageDiv = document.getElementById("error-message-div");
const cardContainer = document.getElementById("favorites-card-container");
const errorSpan = document.createElement("span");

// getCollectionButton.addEventListener("click", (event) => {
//     indexHome.AjaxGetFavorites(getCollectionInput.value);
// })



getCollectionButton.addEventListener("click", (event) => {
    errorSpan.innerHTML = "";
    cardContainer.innerHTML = "";
    AjaxGetFavorites(getCollectionInput.value);
});

export function AjaxGetFavorites() {

    // Creating XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
    var json;

    // Making connection  
    console.log("getCollectionInput.value: ", getCollectionInput.value);
    let url = `https://1810final-rivertrack.azurewebsites.net/collections/${getCollectionInput.value}/get-favorites?`;

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

                GenerateCollection(stationList); //need to pass in the data we're 
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
}
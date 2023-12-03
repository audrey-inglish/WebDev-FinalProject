import homeUi, { GenerateCollection } from "./src/ui/homeUi.js";
import homeSvc from "./src/svc/homeSvc.js";


//call GenerateCollection


const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");
const errorMessageDiv = document.getElementById("error-message-div");


getCollectionButton.addEventListener("click", (event) => {
    AjaxGetFavorites(getCollectionInput.value);

    const errorMessageDiv = document.getElementById("error-message-div");
    const errorSpan = document.createElement("span");
    errorSpan.innerHTML = "";
});

export function AjaxGetFavorites(collectionName) {

    // Creating XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
    var json;

    // Making connection  
    let url = `https://1810final-rivertrack.azurewebsites.net/collections/${collectionName}/get-favorites?`;


    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            json = JSON.parse(this.responseText);


            if (!json) {
                var errorMessage = "That collection doesn't exist. Please try another name.";
                errorSpan.textContent = errorMessage;

                errorMessageDiv.appendChild(errorSpan);
            }
            else {
                alert("got data");
                // homeUi.GenerateCollection(userFavorites);
            }

        }
    }
    // Sending request 
    xhr.send();
    return xhr.responseText;
}

export default {
    AjaxGetFavorites
}


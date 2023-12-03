import homeUi, { GenerateCollection } from "./src/ui/homeUi.js";
import homeSvc from "./src/svc/homeSvc.js";


//call GenerateCollection


const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");

getCollectionButton.addEventListener("click", (event) => {
    const userFavorites = homeSvc.AjaxGetFavorites(getCollectionInput.value);
    console.log("userFavorites:", userFavorites);



    const errorMessageDiv = document.getElementById("error-message-div");
    const errorSpan = document.createElement("span");
    errorSpan.innerHTML = "";

    if (!userFavorites) {
        var errorMessage = "That collection doesn't exist. Please try another name.";
        errorSpan.textContent = errorMessage;

        errorMessageDiv.appendChild(errorSpan);
    }
    else {
        // homeUi.GenerateCollection(userFavorites);
    }
    console.log("userFavorites:", userFavorites);
});



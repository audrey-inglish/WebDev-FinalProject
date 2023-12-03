import homeUi from "./src/ui/homeUi.js";
import homeSvc from "./src/svc/homeSvc.js";


//call GenerateCollection


const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");

getCollectionButton.addEventListener("click", (event) => {
    const userFavorites = homeSvc.AjaxGetFavorites(getCollectionInput.value);
    const errorMessageDiv = document.getElementById("error-message-div");
    errorMessageDiv.innerHTML = "";

    if (!userFavorites) {
        var errorMessage = "That collection doesn't exist. Please try another name."
        errorMessageDiv.appendChild(errorMessage);
    }
    else {

    }
    console.log("userFavorites:", userFavorites);
});



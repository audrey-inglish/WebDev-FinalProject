import homeSvc from "../svc/homeSvc.js";
import indexHome from "../../indexHome.js";

const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");

getCollectionButton.addEventListener("click", (event) => {
    indexHome.AjaxGetFavorites(getCollectionInput.value);
})


export function GenerateCollection(collectionName){
    const cardContainer = document.getElementById("favorites-card-container");
}

function GenerateCard(){

}

export default {
    GenerateCollection
}
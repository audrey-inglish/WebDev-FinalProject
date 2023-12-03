import homeSvc from "../svc/homeSvc.js";
import indexHome from "../../indexHome.js";

const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");
const cardContainer = document.getElementById("favorites-card-container");

getCollectionButton.addEventListener("click", (event) => {
    indexHome.AjaxGetFavorites(getCollectionInput.value);
})


export function GenerateCollection(collectionName){
    


}

function GenerateCard(){

}

function BuildURL(siteIdsArray){
    const joinedSiteIds = siteIdsArray.join(","); //join site ids from array, separated by commas
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${joinedSiteIds}&siteStatus=all`;


}

export default {
    GenerateCollection
}
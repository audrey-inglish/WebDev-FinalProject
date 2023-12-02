import homeSvc from "../svc/homeSvc.js";

const getCollectionButton = document.getElementById("get-collection-button");
const getCollectionInput = document.getElementById("get-collection-input");

getCollectionButton.addEventListener("click", (event) => {
    homeSvc.AjaxGetFavorites(getCollectionInput.value);
})


export function GenerateCollection(collectionName){

}

function GenerateCard(){
    
}

export default {
    GenerateCollection
}
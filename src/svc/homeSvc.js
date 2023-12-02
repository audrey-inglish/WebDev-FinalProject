

export function AjaxGetFavorites(collectionName) {
 
    // Creating XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
 
    // Making connection  
    let url = `https://1810final-rivertrack.azurewebsites.net/collections/${collectionName}/get-favorites?`;
   

    xhr.open("GET", url, true);
 
    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
    // Sending request 
    xhr.send();
}

export default {
    AjaxGetFavorites
}
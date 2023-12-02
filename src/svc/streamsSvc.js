


export async function GetAllStreams() {
    const response = await fetch("https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ut&indent=on&siteStatus=active&siteType=ST");
    const allStreamData = await response.json();

    const condensedStreamsData = {};


    allStreamData.value.timeSeries.forEach(timeSeries => {
        const siteName = timeSeries.sourceInfo.siteName;
        const id = timeSeries.sourceInfo.siteCode[0].value;
        var variable = timeSeries.variable.variableDescription.toLowerCase();
        const unit = timeSeries.variable.unit.unitCode;
        const streamflowData = timeSeries.values[0].value[0];


        if (variable.includes('temperature, water') || variable.includes('discharge')) {
            if(variable.includes('temperature, water')){
                variable = "Temperature";
            }
            else if (variable.includes('discharge')){
                variable = "Discharge";
            }

            const key =  siteName;

            if (!condensedStreamsData[key]) {
                condensedStreamsData[key] = {
                    Site: siteName,
                    Id: id,
                    [variable]: {
                        Unit: unit,
                        Value: streamflowData
                    }
                }
            }
            else {
                condensedStreamsData[key][variable] = {
                    Unit: unit,
                    Value: streamflowData,
                }
            }
        }
    })

    const allStreamsCurrentData = Object.values(condensedStreamsData);

    console.log("all streams (in svc): ", allStreamsCurrentData);
    return allStreamsCurrentData;
}

//reference: https://www.geeksforgeeks.org/how-to-make-ajax-call-from-javascript/
function AjaxSaveFavorites(collectionName, riverList) {
 
    // Creating XMLHttpRequest object 
    let xhr = new XMLHttpRequest();
 
    // Making connection  
    let url = `https://1810final-rivertrack.azurewebsites.net/collections/${collectionName}/save-favorites?`;
    console.log("riverList", riverList);
   

    url += riverList.join("&");
    console.log("url", url);

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

function AjaxGetFavorites(collectionName) {
 
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
    GetAllStreams,
    AjaxSaveFavorites,
    AjaxGetFavorites
}
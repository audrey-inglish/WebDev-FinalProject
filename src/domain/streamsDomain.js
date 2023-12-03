
import streamsSvc from "./../svc/streamsSvc.js";

var allStreams;
var collectionNames = [];


export async function InitializeStreamsData() {
    allStreams = await streamsSvc.GetAllStreams();
}

export function GetAllStreams() {
    return allStreams;
}

// export function SaveCollectionNameToLocalStorage(collectionName) {
//     if(localStorage.getItem("savedCollections"))
//     {
//         const retrievedNames = localStorage.getItem("savedCollections"); 
//         collectionNames = JSON.parse(retrievedNames);

//     }
    
//     console.log("Array from local storage: ", collectionNames);
//     collectionNames.push(collectionName);
//     localStorage.setItem('savedCollections', JSON.stringify(collectionNames));
// }

export function ParseDateTime(dateTimeString) {
    const parsedDate = new Date(dateTimeString);

    const options = {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };

    const formattedDateTime = parsedDate.toLocaleString('en-US', options);

    return formattedDateTime;

}



export default {
    InitializeStreamsData,
    GetAllStreams,
    ParseDateTime,
    // SaveCollectionNameToLocalStorage
}
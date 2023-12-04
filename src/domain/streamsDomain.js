
import streamsSvc from "./../svc/streamsSvc.js";

var allStreams;
var collectionNames = [];


export async function InitializeStreamsData() {
    allStreams = await streamsSvc.GetStreams();
}

export function GetStreams() {
    return allStreams;
}


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
    GetStreams,
    ParseDateTime,
}